const { Server } = require("socket.io");

const survgame = new Server(parseInt(process.env.EXPRESS_PORT) + 1, {
    "cors": {
        "origin": process.env.SOCKET_ALLOWED_ORIGIN
    }
});

module.exports = survgame;