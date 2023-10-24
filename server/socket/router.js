const { Router } = require("express");

const socket = require("./socket");

const { QuitPacket } = require("./lib/packet");
const session = require("../lib/session");
const eventBus = require("./lib/event");
const Player = require("./lib/player");
const Room = require("./lib/room");

/**
 * @type {Router}
 */
const router = new Router();

router.ws("/api/socket", client => {

    client.on("message", async message => {

        let packet = JSON.parse(message);

        // Authenticate packet token
        let username = await session.usernameOf(packet.token);
        if (username == null) {
            return client.close(1008, "Invalid session");
        }

        // Attach a player to client
        client.player ??= new Player(username);

        // Log successful packet
        console.log(`[Serverbound@${packet.room}] ${packet.type} from ${username}`);

        // Invoke listeners of received packet type
        for (let listener of eventBus.listenersOf(packet.type)) {
            listener(packet, client);
        }

    });

    client.on("close", () => {

        // implement

    });

});

module.exports = router;