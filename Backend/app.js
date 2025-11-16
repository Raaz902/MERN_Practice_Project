const express = require("express");
const morgan = require("morgan");
const { google } = require("googleapis");
const open = require("open").default;
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(morgan("dev"));
app.use(cors());

const TOKEN_PATH = path.join(__dirname, "tokens.json");

// ================================
// 🔐 Google OAuth2 Setup
// ================================
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

// Load tokens if available
if (fs.existsSync(TOKEN_PATH)) {
    const savedTokens = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
    oauth2Client.setCredentials(savedTokens);
    console.log("✅ Loaded existing tokens from file");
}

// ================================
// 🔹 Step 1: Start OAuth Authorization
// ================================
app.get("/auth", (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent", // ensures refresh token each time
        scope: ["https://www.googleapis.com/auth/youtube.force-ssl"],
    });
    open(url);
    res.send("Redirecting to Google authorization...");
});

// ================================
// 🔹 Step 2: OAuth Callback (save tokens)
// ================================
app.get("/oauth2callback", async (req, res) => {
    try {
        const { tokens } = await oauth2Client.getToken(req.query.code);
        oauth2Client.setCredentials(tokens);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
        console.log("✅ Tokens received and saved:", tokens);
        res.send("Authorization successful! Tokens saved. Now visit /create-stream");
    } catch (err) {
        console.error("❌ Error retrieving tokens:", err.message);
        res.status(500).send("Error during OAuth callback");
    }
});

// ================================
// 🔹 Step 3: Create YouTube Live Stream
// ================================
app.get("/create-stream", async (req, res) => {
    try {
        // Make sure we have valid tokens
        if (!oauth2Client.credentials || !oauth2Client.credentials.access_token) {
            return res.status(401).send("Not authorized. Visit /auth first.");
        }

        const youtube = google.youtube({ version: "v3", auth: oauth2Client });

        // Create Live Broadcast
        const broadcastResponse = await youtube.liveBroadcasts.insert({
            part: "snippet,contentDetails,status",
            requestBody: {
                snippet: {
                    title: "My First Live Stream 🚀",
                    scheduledStartTime: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
                },
                status: { privacyStatus: "private" },
                contentDetails: { monitorStream: { enableMonitorStream: false } },
            },
        });

        const broadcast = broadcastResponse.data;
        console.log("✅ Broadcast created:", broadcast.id);

        // Create Live Stream (input)
        const streamResponse = await youtube.liveStreams.insert({
            part: "snippet,cdn,contentDetails",
            requestBody: {
                snippet: { title: "My Live Stream Input" },
                cdn: {
                    frameRate: "30fps",
                    ingestionType: "rtmp",
                    resolution: "720p",
                },
            },
        });

        const stream = streamResponse.data;
        console.log("✅ Stream created:", stream.id);

        // Bind both
        await youtube.liveBroadcasts.bind({
            part: "id,contentDetails",
            id: broadcast.id,
            streamId: stream.id,
        });

        console.log("✅ Broadcast bound to stream");

        res.json({
            message: "🎉 Live stream setup successful!",
            broadcastId: broadcast.id,
            streamKey: stream.cdn.ingestionInfo.streamName,
            ingestionUrl: stream.cdn.ingestionInfo.ingestionAddress,
            fullRtmpUrl: `${stream.cdn.ingestionInfo.ingestionAddress}/${stream.cdn.ingestionInfo.streamName}`,
        });
    } catch (err) {
        console.error("❌ Error creating stream:", err.message);
        res.status(500).send("Error creating live stream");
    }
});

// ================================
// 🔹 Start Server
// ================================
const PORT = 7005;
app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
);

app.get("/go-live", async (req, res) => {
    try {
        const youtube = google.youtube({ version: "v3", auth: oauth2Client });

        // Get your broadcast ID (you can store it when created)
        const broadcastId = "VvYR-KvLBxg"; // replace or fetch dynamically

        // Transition broadcast from 'ready' → 'live'
        const liveResponse = await youtube.liveBroadcasts.transition({
            part: "status",
            broadcastStatus: "live",
            id: broadcastId,
        });

        console.log("✅ Broadcast is now live:", liveResponse.data.id);
        res.send("Broadcast is now LIVE!");
    } catch (err) {
        console.error("❌ Error starting live broadcast:", err.message);
        res.status(500).send("Error starting live broadcast");
    }
});


// testing practice
function greet(name) {
    return `Hello, ${name}!`;
}
function greetIn_Russian(name) {
    return `привет, ${name}!`;
}
function greetIn_Russian2(name) {
    return `привет, ${name}!`;
}
function designBranchFn(name) {
    return `привет, ${name}!`;
}
function designBranchFn2(name) {
    return `привет, ${name}!`;
}
module.exports = { greet, greetIn_Russian, greetIn_Russian2, designBranchFn };