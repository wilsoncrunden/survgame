const Room = require("./lib/room");

const eventBus = require("./event");

/**
 * @type {Room[]}
 */
const rooms = [];

/**
 * @description Adds a client to a room
 */
function addPlayer(roomCode, client) {
    // Add player to existing room
    for (let room of rooms) {
        if (room.code == roomCode) {
            if (room.players().includes(client.username)) {
                return false;
            }

            room.clients.add(client);
            return true;
        }
    }

    // If no such room exists, create a new one with player in it
    // Change this later when rooms must be opened manually
    let newRoom = new Room(roomCode);
    newRoom.clients.add(client);
    rooms.push(newRoom);

    return true;
}

/**
 * @description Disconnects a client from any room
 */
function disconnectPlayer(username) {
    for (let room of rooms) {
        if (room.disconnect(username)) break;
    }
}

/**
 * @description Returns the clients of a room given its room code
 */
function clientsOf(roomCode) {
    for (let room of rooms) {
        if (room.code == roomCode) {
            return room.clients.values();
        }
    }
    return [];
}

/**
 * @description Returns the room code of a given client or null
 */
function roomCodeOf(username) {
    for (let room of rooms) {
        if (room.players().includes(username)) {
            return room.code;
        }
    }
    return null;
}

/**
 * @description Registers vanilla listeners against the event bus
 */
function registerListeners() {
    eventBus.listen("JOIN", require("./events/join"));
    eventBus.listen("CHAT_MESSAGE", require("./events/chatmessage"));
}

module.exports = {
    addPlayer,
    disconnectPlayer,
    clientsOf,
    roomCodeOf,
    registerListeners
};