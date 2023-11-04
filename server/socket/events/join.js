const { Socket } = require("socket.io");

const session = require("../../lib/session");

const type = "join";

/**
 * @param {Socket} client
 * @param {string} roomCode
 * @param {string} token
 */
function dispatch(client, roomCode, token) {

    // Extract token from cookie string
    token = session.extract(token);

    console.log(`Joining ${roomCode} with ${token}`);

}

module.exports = { type, dispatch };