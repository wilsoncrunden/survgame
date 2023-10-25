const { PlayerFetchPacket } = require("../lib/packet");

async function onPlayerFetch(packet, client) {

    let username = client.player.username;
    let room = client.player.room;

    room.send(new PlayerFetchPacket(room.usernames()), username);

}

module.exports = onPlayerFetch;