const { Socket } = require("socket.io");

const session = require("../../lib/session");
const Player = require("../lib/player");

const type = "join";

/**
 * @param {Socket} client
 * @param {string} roomCode
 * @param {string} token
 */
async function dispatch(client, roomCode, token) {

    // Authenticate session token
    try {
        var username = await session.usernameOf(token);
        if (username == null) throw new Error();
    } catch (err) {
        return client.disconnect(true);
    }

    // Attach player object to client
    client.player = new Player(username, roomCode);

    // Connect client to room
    client.join(roomCode);

    // Broadcast relay packet
    client.server.to(roomCode).emit("join", username);

}

module.exports = { type, dispatch };