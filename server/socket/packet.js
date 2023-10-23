const socket = require("./socket");

class ClientboundPacket {
    constructor(type) {
        this.type = type;
    }

    /**
     * @description Broadcasts packet to a room from an optional sender's username
     */
    broadcast(roomCode, sender = null) {
        for (let client of socket.clientsOf(roomCode)) {
            if (client.username != sender || sender == null) {
                client.send(JSON.stringify(this));
            }
        }

        // Log successful packet
        console.log(`[Clientbound@${roomCode}] ${this.type} broadcasted by ${sender ?? "server"}`);
    }
}

class JoinPacket extends ClientboundPacket {
    constructor(username) {
        super("JOIN");

        this.username = username;
    }
}

class QuitPacket extends ClientboundPacket {
    constructor(username) {
        super("QUIT");

        this.username = username;
    }
}

class ChatMessagePacket extends ClientboundPacket {
    constructor(username, message) {
        super("CHAT_MESSAGE");

        this.username = username;
        this.message = message;
    }
}

module.exports = {
    JoinPacket,
    QuitPacket,
    ChatMessagePacket
};