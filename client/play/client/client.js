const roomCode = location.pathname.split("/").at(-1);

const socket = io("wss://mnt9fw-8081.csb.app");

socket.emit("join", roomCode, document.cookie);