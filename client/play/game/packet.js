const roomCode = location.href.split("/").at(-1);
const sessionToken = document.cookie.match(/(?<=survgame_session_token=).+?(?=;|$)/)[0];

class ServerboundPacket {
    room = roomCode;
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
    }
}

class ChatMessagePacket extends ServerboundPacket {
    constructor(message) {
        super("CHAT_MESSAGE");

        this.message = message;
    }
}