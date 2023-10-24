function loadChatMessage(message) {

    if ($("#chat span").length == 19) {
        $("#chat span").get(0).remove();
    }

    let messageElement = $("<span>").html(message);
    $("#chat").append(messageElement);

}

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

    clearInterval(joinAttemptHeartbeat);

    loadChatMessage(`<b style=color:#ff9f46>${username} has joined the room.</b>`);

});

eventBus.listen("QUIT", packet => {

    let {
        username
    } = packet;

    loadChatMessage(`<b style=color:#ff9f46>${username} has left the room.</b>`);

})