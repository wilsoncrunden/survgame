const { ChatMessagePacket } = require("./../packet");

function onChatMessage(packet) {

    let {
        room,
        username,
        message
    } = packet;

    // Validation
    message = message.replace(/[<>]/g, "");
    if (message.length == 0) return;

    // Relay
    let relayPacket = new ChatMessagePacket(username, message);
    relayPacket.broadcast(room);

}

module.exports = onChatMessage;