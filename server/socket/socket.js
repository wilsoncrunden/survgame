const Room = require("./lib/room");

const eventBus = require("./lib/event");

/**
 * @type {Room[]}
 */
const rooms = [new Room("public")];

/**
 * @description Returns room with given room code or null if no such room exists
 */
function roomWithCode(roomCode) {
    for (let room of rooms) {
        if (room.code == roomCode) return room;
    }
    return null;
}

/**
 * @description Registers vanilla listeners against the event bus
 */
function registerListeners() {
    eventBus.listen("JOIN", require("./events/join"));
    eventBus.listen("PLAYER_FETCH", require("./events/playerfetch"));
    eventBus.listen("CHAT_MESSAGE", require("./events/chatmessage"));
}

module.exports = {
    roomWithCode,
    registerListeners
};