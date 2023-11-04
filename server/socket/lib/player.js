class Player {

    lastMessageTimestamp = 0;

    /**
     * @param {string} username
     * @param {string} room
     */
    constructor(username, room) {
        this.username = username;
        this.room = room;
    }

}

module.exports = Player;