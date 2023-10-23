$("#sendChatMessageButton").click(() => {

    let message = $("#chatMessageField").val();
    
    let messagePacket = new ChatMessagePacket(roomCode, message);
    messagePacket.send();

});