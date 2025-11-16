
const socket = require('socket.io');



const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: 'http://localhost:3000',
        }
    });
    io.on('connection', (socket) => {
        socket.on('joinChat', (data) => {
            const roomId = [data.userId, data.targetUserId]?.sort()?.join('_');
            console.log(data.userName + ' joined the room: ' + roomId);
            socket.join(roomId);
        });
        socket.on('sendMessage', (data) => {
            console.log(data);
            const { userName, from: userId, to: targetUserId, message } = data;
            const roomId = [userId, targetUserId]?.sort()?.join('_');
            console.log(data);
            io.to(roomId).emit('receiveMessage', { from: userId, to: targetUserId, userName, message });

        });
        socket.on('disconnet', () => { });

    });
}

module.exports = initializeSocket;