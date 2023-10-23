class Room {

    clients = new Set();

    /**
     * @param {string} code The room code
     */
    constructor(code) {
        this.code = code;
    }

    /**
     * @returns {string[]}
     * @description Returns list of connected clients' usernames
     */
    players() {
        let usernames = [];
        for (let client of this.clients.values()) {
            usernames.push(client.username);
        }
        return usernames;
    }

    /**
     * @description Disconnects player from the room and returns whether or not a player was found to disconnect 
     */
    disconnect(username) {
        for (let client of this.clients.values()) {
            if (client.username == username) {
                return this.clients.delete(client);
            }
        }
        return false;
    }

}

module.exports = Room;