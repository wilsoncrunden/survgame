const { Router } = require("express");

const session = require("./../session");
const eventBus = require("./event");

/**
 * @type {Router}
 */
const router = new Router();

router.ws("/api/socket", client => {

    client.on("message", async message => {

        let packet = JSON.parse(message);

        // Authenticate packet sender's session
        if ((await session.usernameOf(packet.token)) == null) {
            client.close(1, "Invalid Session");
        }

        // Invoke listeners of received packet type
        for (let listener of eventBus.listenersOf(packet.type)) {
            listener(packet);
        }

    });

});

module.exports = router;