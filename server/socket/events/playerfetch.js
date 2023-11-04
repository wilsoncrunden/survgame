const { Socket, Server } = require("socket.io");

const Player = require("../lib/player");

const type = "player_fetch";

/**
 * @param {Socket} client
 * @param {string} message
 */
async function dispatch(client) {

    /**
     * @type {Server}
     */
    let server = client.server;

    /**
     * @type {Player}
     */
    let player = client.player;

    let sockets = await server.to(player.room).fetchSockets();
    client.emit("player_fetch", sockets.map(socket => socket.player.username));

}

module.exports = { type, dispatch };