const roomCode = location.href.split("/").at(-1);
const sessionToken = document.cookie.match(/(?<=survgame_session_token=).+?(?=;|$)/)[0];

class ServerboundPacket {
    token = sessionToken;

    constructor(type) {
        this.type = type;
    }

    send() {
        socket.send(JSON.stringify(this));
    }
}

class JoinPacket extends ServerboundPacket {
    constructor() {
        super("JOIN");

        this.room = roomCode;
    }
}

class PlayerFetchPacket extends ServerboundPacket {
    constructor() {
        super("PLAYER_FETCH");
    }
}

class ChatMessagePacket extends ServerboundPacket {
    constructor(message) {
        super("CHAT_MESSAGE");

        this.message = message;
    }
}