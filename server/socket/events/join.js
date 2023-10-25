const socket = require("../socket");

const { JoinPacket } = require("../lib/packet");
const session = require("../../lib/session");
const Player = require("../lib/player");

async function onClientJoin(packet, client) {

    let {
        room = "",
        token = ""
    } = packet;

    // Fetch username from token
    let username = await session.usernameOf(token);
    if (username == null) {
        return client.close(1008, "Invalid session");
    }

    // Attach player object to client
    client.player = new Player(username);
    
    // Add client to requested room or disconnect if room does not exist
    let requestedRoom = socket.roomWithCode(room);
    if (requestedRoom == null) {
        return client.close(1008, "Requested room does not exist or is not open");
    }
    client.player.room = requestedRoom;

    // Broadcast relay join packet
    requestedRoom.broadcast(new JoinPacket(username));

}

module.exports = onClientJoin;