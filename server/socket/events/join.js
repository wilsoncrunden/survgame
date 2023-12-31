const { Socket } = require("socket.io");

const session = require("../../lib/session");
const survgame = require("../server");
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

    // Connect client to room if not connected from another location
    try {
        var sockets = await survgame.fetchSockets();
    } catch (err) {
        return client.disconnect(true);
    }
    
    let playerExists = sockets.some(socket => {
        if (!socket.player) return false;
        return socket.player.username == username;
    });
    if (playerExists) {
        return client.disconnect(true);
    }

    client.join(roomCode);

    // Attach player object to client
    client.player = new Player(username, roomCode);

    // Broadcast relay packet
    survgame.to(roomCode).emit("join", username);

}

module.exports = { type, dispatch };