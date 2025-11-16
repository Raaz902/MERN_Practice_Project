import React, { useState } from "react";

const AdminLiveClass = () => {
    const [streamData, setStreamData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateStream = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("http://localhost:8005/create-stream");
            console.log(res);
            if (!res.ok) throw new Error("Failed to create stream");
            const data = await res.json();
            setStreamData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md w-full max-w-2xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">🎥 Start a Live Class</h1>

            {!streamData && (
                <button
                    onClick={handleCreateStream}
                    disabled={loading}
                    className="bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    {loading ? "Creating Stream..." : "Create YouTube Live Stream"}
                </button>
            )}

            {error && <p className="text-red-600 mt-4">{error}</p>}

            {streamData && (
                <div className="mt-6 bg-white p-4 rounded-md border">
                    <h2 className="text-xl font-bold mb-2">✅ Live Stream Ready</h2>
                    <p><strong>Broadcast ID:</strong> {streamData.broadcastId}</p>
                    <p><strong>RTMP Server (OBS):</strong> {streamData.ingestionUrl}</p>
                    <p><strong>Stream Key:</strong> {streamData.streamKey}</p>

                    <div className="mt-4 p-3 bg-gray-100 rounded-md">
                        <p className="font-semibold">➡️ Full RTMP URL:</p>
                        <code>{streamData.fullRtmpUrl}</code>
                    </div>

                    <div className="mt-4">
                        <p className="text-green-700">
                            Paste this info in OBS to start your live stream.
                        </p>
                    </div>

                    <div className="mt-4 border-t pt-4">
                        <p className="text-gray-700 text-sm">
                            Once streaming starts, students can watch here: <br />
                            <a
                                href={`https://www.youtube.com/watch?v=${streamData.broadcastId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                https://www.youtube.com/watch?v={streamData.broadcastId}
                            </a>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLiveClass;
