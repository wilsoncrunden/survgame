const socket = require("../socket");

const { ChatMessagePacket } = require("../lib/packet");

function onChatMessage(packet, client) {

    let {
        room,
        message
    } = packet;

    message = message.replace(/[<>]/g, "");
    if (message.length == 0) return;

    

}

module.exports = onChatMessage;