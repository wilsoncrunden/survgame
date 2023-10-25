const socket = require("../socket");

const { JoinPacket } = require("../lib/packet");
const session = require("../../lib/session");
const Player = require("../lib/player");

async function onClientJoin(packet, client) {

    let {
        room = "",
        token = ""
    } = packet;

    // If client is already in room ignore
    if (client.player != null) return;

    // Fetch username from token
    let username = await session.usernameOf(token);
    if (username == null) {
        return client.close(1008, "Invalid session");
    }

    // Fetch requested room from room code
    let requestedRoom = socket.roomWithCode(room);
    if (requestedRoom == null) {
        return client.close(1008, "Requested room does not exist or is not open");
    }

    // Attach player object to client
    client.player = new Player(username);

    // Add client to requested room
    requestedRoom.clients.add(client);
    client.player.room = requestedRoom;

    // Broadcast relay join packet
    requestedRoom.broadcast(new JoinPacket(username));

}

module.exports = onClientJoin;