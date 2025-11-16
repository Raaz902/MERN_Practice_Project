import { useEffect, useState } from 'react';
import { createSocketConnection } from './utils/socket';
import { useParams } from 'react-router-dom';

const users = [
    { userId: 1, userName: 'Raaz' },
    { userId: 2, userName: 'Afzal' }
]

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const { userId, targetUserId } = useParams();
    const [user, setUser] = useState(users.find(u => u.userId == userId) || {});
    const [newMassage, setNewMessage] = useState('');
    console.log(user);

    useEffect(() => {
        const socket = createSocketConnection();
        socket.emit('joinChat', { userId, targetUserId, userName: user?.userName });
        socket.on('receiveMessage', (data) => {
            setMessages(prevMessages => [...prevMessages, data]);
        });
        return () => {
            socket.disconnect();
        }
    }, [user])
    function sendMesage() {
        const socket = createSocketConnection();
        socket.emit('sendMessage', { from: userId, to: targetUserId, userName: user.userName, message: newMassage });
        setNewMessage('');
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="container d-flex flex-column bg-white shadow rounded-4 p-3" style={{ maxWidth: "600px", height: "80vh" }}>

                {/* Header */}
                <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-2">
                    <h4 className="m-0 text-primary fw-bold">
                        {user?.userName || "Chat Room"}
                    </h4>
                    <span className="badge bg-success">Online</span>
                </div>

                {/* Messages Section */}
                <div className="flex-grow-1 overflow-auto p-3 border rounded bg-light" style={{ minHeight: "200px" }}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`d-flex mb-2 ${msg.from === userId ? 'justify-content-end' : 'justify-content-start'}`}>
                            <div
                                className={`p-2 px-3 rounded-3 shadow-sm ${msg.from === userId ? 'bg-primary text-white' : 'bg-secondary text-white'}`}
                                style={{ maxWidth: "70%" }}
                            >
                                {msg.message}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Section */}
                <div className="d-flex mt-3">
                    <input
                        type="text"
                        value={newMassage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="form-control rounded-pill me-2 shadow-sm"
                    />
                    <button
                        onClick={() => sendMesage()}
                        className="btn btn-success rounded-pill px-4 shadow-sm"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>


    )
}

export default ChatPage