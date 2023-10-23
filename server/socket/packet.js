const socket = require("./socket");

class ClientboundPacket {
    constructor(type) {
        this.type = type;
    }

    broadcast(roomCode) {
        for (let client of socket.clientsOf(roomCode)) {
            client.send(JSON.stringify(this));
        }
    }
}

class ChatMessagePacket extends ClientboundPacket {
    constructor(username, message) {
        super("CHAT_MESSAGE");

        this.username = username;
        this.message = message;
    }
}