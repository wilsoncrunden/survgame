const socket = require("./../socket");

const { JoinPacket } = require("../lib/packet");

function onClientJoin(packet, client) {

    let {
        room,
        username
    } = packet;

    socket.addPlayer(room, client);

    let relayPacket = new JoinPacket(username);
    relayPacket.broadcast(room);

}

module.exports = onClientJoin;