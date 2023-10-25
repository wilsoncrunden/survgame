const { Router } = require("express");

const { QuitPacket } = require("./lib/packet");
const session = require("../lib/session");
const eventBus = require("./lib/event");

/**
 * @type {Router}
 */
const router = new Router();

router.ws("/api/socket", client => {

    client.player = null;

    client.on("message", async message => {

        let packet = JSON.parse(message);

        // Authenticate packet token
        let username = await session.usernameOf(packet.token);
        if (username == null) {
            return client.close(1008, "Invalid session");
        }

        // Reject non-join packets if client is not in room
        if (packet.type != "JOIN" && client.player == null) {
            return client.close(1008, "Client player not initialised");
        }

        // Invoke listeners of received packet type
        for (let listener of eventBus.listenersOf(packet.type)) {
            listener(packet, client);
        }

        // Log successful packet
        console.log(`[Serverbound@${packet.room}] ${packet.type} from ${username}`);

    });

    client.on("close", async () => {

        if (client.player == null) return;

        let username = client.player.username;

        client.player.room.disconnect(username);
        client.player.room.broadcast(new QuitPacket(username), username);

    });

});

module.exports = router;