const socket = require("../socket");

const { JoinPacket } = require("../lib/packet");
const Player = require("../lib/player");

async function onClientJoin(packet, client) {

    let {
        room,
        username
    } = packet;

    client.player = new Player(username);
    client.player.room = socket.roomWithCode(room);

    client.player.room.clients.add(client);

    client.player.room.broadcast(new JoinPacket(username));

}

module.exports = onClientJoin;