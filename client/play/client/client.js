const roomCode = location.pathname.split("/").at(-1);
const sessionToken = document.cookie.match(/(?<=survgame_session_token=).+?(?=;|$)/)[0];

const socket = io(`${location.protocol.startsWith("https") ? "wss" : "ws"}://${location.hostname}:${parseInt(location.port) + 1}`);

socket.on("disconnect", () => {
    
    alert("The server has closed your connection.");
    location.href = "/dash";

});