const { Server } = require("socket.io");
const { readdirSync } = require("fs");

const survgame = new Server(process.env.EXPRESS_PORT + 1, {
    "cors": {
        "origin": process.env.SOCKET_ALLOWED_ORIGIN
    }
});

const events = readdirSync("server/socket/events").map(file => {
    return require("./events/" + file);
});

survgame.on("connection", client => {

    // Attach server instance to client
    client.server = survgame;

    // Register events
    client.onAny((event, ...args) => {

        if ((!client.player && event != "join") || (client.player && event == "join")) {
            return client.disconnect(true);
        }

        for (let listener of events) {
            if (listener.type != event) continue;
            listener.dispatch(client, ...args);
        }

    });

    client.on("disconnect", () => {

        if (!client.player) return;

        let player = client.player;
        survgame.to(player.room).emit("quit", player.username);

    });

});

console.log("Survgame socket server running on port 8081");