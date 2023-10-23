const rooms = {};

const eventBus = require("./event");

/**
 * @description Logs given client as in the given room
 */
function addClient(roomCode, client) {
    rooms[roomCode] ??= [];
    rooms[roomCode].push(client);
}

/**
 * @description Logs given client as no longer in the given room
 */
function removeClient(roomCode, client) {
    rooms[roomCode].splice(rooms[roomCode].indexOf(client), 1);
}

/**
 * @description Returns list of clients in a given room
 */
function clientsOf(roomCode) {
    return rooms[roomCode] ?? [];
}

/**
 * @description Registers vanilla listeners against the event bus
 */
function registerListeners() {
    eventBus.listen("CHAT_MESSAGE", require("./events/chatmessage"));
}

module.exports = {
    addClient,
    removeClient,
    clientsOf,
    registerListeners
};