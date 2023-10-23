function onChatMessage(packet) {

    let {
        message
    } = packet;

    console.log("Chat message received: " + message);

}

module.exports = onChatMessage;