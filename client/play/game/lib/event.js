const eventBus = {
    events: {},

    /**
     * @param {string} packetType 
     * @param {(packet: object) => void} eventFn
     * @description Adds a listener callback to the event bus for a given packet type
     */
    listen(packetType, listenerCallback) {
        this.events[packetType] ??= [];
        this.events[packetType].push(listenerCallback);
    },

    /**
     * @param {string} packetType 
     * @returns {((packet: object) => void)[]}
     * @description Returns list of listener callbacks for given packet type
     */
    listenersOf(packetType) {
        return this.events[packetType] ?? [];
    }
};