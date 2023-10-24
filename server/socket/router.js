const { Router } = require("express");

const { QuitPacket } = require("./lib/packet");
const session = require("../lib/session");
const socket = require("./socket");
const eventBus = require("./lib/event");

/**
 * @type {Router}
 */
const router = new Router();

router.ws("/api/socket", client => {

    client.on("message", async message => {

        let packet = JSON.parse(message);

        // Authenticate packet sender's session
        let packetUsername = await session.usernameOf(packet.token);
        if (packetUsername == null) {
            return client.close(1008, "Invalid Session");
        }
        packet.username = packetUsername;
    
        // Assign username to client object
        client.username = packetUsername;

        // Log successful packet
        console.log(`[Serverbound@${packet.room}] ${packet.type} from ${packet.username}`);

        // Invoke listeners of received packet type
        for (let listener of eventBus.listenersOf(packet.type)) {
            listener(packet, client);
        }

    });

    client.on("close", () => {

        let quitPacket = new QuitPacket(client.username);
        quitPacket.broadcast(socket.roomCodeOf(client.username), client.username);

        socket.disconnectPlayer(client.username);

    });

});

module.exports = router;