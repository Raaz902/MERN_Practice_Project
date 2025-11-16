import io from "socket.io-client";
const SOCKET_URL = "http://localhost:4000";

export const createSocketConnection = () => {
    return io(SOCKET_URL);
}