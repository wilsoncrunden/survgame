const roomCode = location.pathname.split("/").at(-1);
const sessionToken = document.cookie.match(/(?<=survgame_session_token=).+?(?=;|$)/)[0];

let socket = io("wss://socket.surv.wintrcat.uk/");

socket.on("disconnect", () => {
    
    alert("The server has closed your connection.");
    location.href = "/dash";

});