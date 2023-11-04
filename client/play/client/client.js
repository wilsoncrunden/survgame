const roomCode = location.pathname.split("/").at(-1);

const socket = io("ws://localhost:8081");

socket.emit("join", roomCode, document.cookie);