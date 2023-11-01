const { Server } = require("socket.io");

const survgame = new Server(8081, {
    "cors": {
        "origin": process.env.SOCKET_ALLOWED_ORIGIN
    }
});

survgame.on("connection", client => {

    console.log("Client connected!");

});

console.log("Survgame socket server running on port 8081");