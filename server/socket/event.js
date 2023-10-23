const events = {};

/**
 * @param {string} packetType 
 * @param {(packet: object) => void} eventFn
 * @description Adds a listener callback to the event bus for a given packet type
 */
function listen(packetType, listenerCallback) {
    events[packetType] ??= [];
    events[packetType].push(listenerCallback);
}

/**
 * @param {string} packetType 
 * @returns {((packet: object) => void)[]}
 * @description Returns list of listener callbacks for given packet type
 */
function listenersOf(packetType) {
    return events[packetType] ?? [];
}

module.exports = {
    listen,
    listenersOf
};