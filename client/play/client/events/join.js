// Clientbound
socket.emit("join", roomCode, sessionToken);

// Serverbound
socket.on("join", username => {

    addSystemChatMessage(username + " has joined the room.");

});