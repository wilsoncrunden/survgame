const { ChatMessagePacket } = require("../lib/packet");

function onChatMessage(packet, client) {

    let {
        message
    } = packet;

    message = message.replace(/[<>]/g, "");
    if (message.length == 0) return;

    client.player.room.broadcast(new ChatMessagePacket(client.player.username, message));

}

module.exports = onChatMessage;