const socket = new WebSocket("ws://" + location.hostname + ":" + location.port + "/api/socket");

const roomCode = location.href.split("/").at(-1);
const sessionToken = document.cookie.match(/(?<=survgame_session_token=).+?(?=;|$)/)[0];

class ServerboundPacket {
    token = sessionToken;

    constructor(type, room) {
        this.type = type;
        this.room = room;
    }

    send() {
        socket.send(JSON.stringify(this));
    }
}

class ChatMessagePacket extends ServerboundPacket {
    constructor(room, message) {
        super("CHAT_MESSAGE", room);

        this.message = message;
    }
}