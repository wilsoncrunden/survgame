const { ClientboundPacket } = require("./packet");

class Room {

    clients = new Set();

    /**
     * @param {string} code The room code
     */
    constructor(code) {
        this.code = code;
    }

    /**
     * @param {ClientboundPacket} packet
     * @param {string?} sender
     * @description Broadcasts packet to all clients in the room excluding an optional sender's username
     */
    broadcast(packet, sender = null) {
        for (let client of this.clients.values()) {
            if (client.player.username != sender) {
                client.send(JSON.stringify(packet));
            }
        }

        console.log(`[Clientbound@${this.code}] ${packet.type} broadcasted by ${sender ?? "server"}`);
    }

    /**
     * @param {ClientboundPacket} packet
     * @param {string} recipient
     * @description Send a packet to a particular recipient given their username
     */
    send(packet, recipient) {
        for (let client of this.clients.values()) {
            if (client.player.username == recipient) {
                return client.send(JSON.stringify(packet));
            }
        }
    }

    /**
     * @description Returns list of usernames of connected players
     */
    usernames() {
        return [...this.clients].map(client => client.player.username);
    }

    /**
     * @param {string} username
     * @description Returns client with given username or null if client is not in this room
     */
    getPlayer(username) {
        for (let client of this.clients.values()) {
            if (client.player.username == username) {
                return client;
            }
        }
        return null;
    }

    /**
     * @description Disconnects player from the room and returns whether or not a player was found to disconnect 
     */
    disconnect(username) {
        for (let client of this.clients.values()) {
            if (client.player.username == username) {
                return this.clients.delete(client);
            }
        }
        return false;
    }

}

module.exports = Room;