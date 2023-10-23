function sendMessage() {

    let message = $("#chatMessageField").val();
    
    let messagePacket = new ChatMessagePacket(message);
    messagePacket.send();

}

$("#sendChatMessageButton").click(sendMessage);

addEventListener("keypress", event => {
    if (event.key == "Enter" && $("#chatMessageField").is(":focus")) {
        sendMessage();
    }
});