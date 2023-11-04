// Clientbound
socket.on("quit", username => {

    addSystemChatMessage(username + " has left the room.");
    socket.emit("player_fetch");

});