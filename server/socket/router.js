const { Server } = require("socket.io");
const { readdirSync } = require("fs");

const survgame = new Server(8081, {
    "cors": {
        "origin": process.env.SOCKET_ALLOWED_ORIGIN
    }
});

const events = readdirSync("server/socket/events").map(file => {
    return require("./events/" + file);
});

survgame.on("connection", client => {

    console.log("Client connected!");

    // Register events
    client.onAny((event, ...args) => {
        for (let listener of events) {
            if (listener.type != event) continue;
            listener.dispatch(client, ...args);
        }
    });

});

console.log("Survgame socket server running on port 8081");