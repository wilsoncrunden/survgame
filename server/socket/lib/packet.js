class ClientboundPacket {
    constructor(type) {
        this.type = type;
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
    ClientboundPacket,
    JoinPacket,
    QuitPacket,
    ChatMessagePacket
};