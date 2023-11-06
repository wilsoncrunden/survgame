const { readdirSync } = require("fs");

const survgame = require("./server");

const events = readdirSync("server/socket/events").map(file => {
    return require("./events/" + file);
});

survgame.on("connection", client => {

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

console.log("Survgame socket server running on port " + (parseInt(process.env.EXPRESS_PORT) + 1));