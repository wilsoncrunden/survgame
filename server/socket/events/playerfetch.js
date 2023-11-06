const { Socket } = require("socket.io");

const survgame = require("../server");
const Player = require("../lib/player");

const type = "player_fetch";

/**
 * @param {Socket} client
 * @param {string} message
 */
async function dispatch(client) {

    /**
     * @type {Player}
     */
    let player = client.player;

    let sockets = await survgame.to(player.room).fetchSockets();
    client.emit("player_fetch", sockets.map(socket => socket.player.username));

}

module.exports = { type, dispatch };