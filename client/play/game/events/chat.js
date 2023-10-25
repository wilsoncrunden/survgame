/**
 * @description Sends the message contained in the message field
 */
function sendMessage() {

    let message = $("#chatMessageField").val();
    
    let messagePacket = new ChatMessagePacket(message);
    messagePacket.send();

}

/**
 * @description Loads given HTML text into chat room area
 */
function loadChatMessage(message) {

    if ($("#chat span").length == 19) {
        $("#chat span").get(0).remove();
    }

    let messageElement = $("<span>").html(message);
    $("#chat").append(messageElement);

}

$("#sendChatMessageButton").click(sendMessage);
addEventListener("keypress", event => {
    if (event.key == "Enter" && $("#chatMessageField").is(":focus")) {
        sendMessage();
    }
});

eventBus.listen("CHAT_MESSAGE", packet => {

    let {
        username,
        message
    } = packet;

    loadChatMessage(`<b style="color:#eb144c">${username}</b>: ${message}`);

    $("#chatMessageField").val("");

});

eventBus.listen("JOIN", packet => {

    let {
        username
    } = packet;

    loadChatMessage(`<b style=color:#ff9f46>${username} has joined the room.</b>`);

});

eventBus.listen("QUIT", packet => {

    let {
        username
    } = packet;

    loadChatMessage(`<b style=color:#ff9f46>${username} has left the room.</b>`);

});