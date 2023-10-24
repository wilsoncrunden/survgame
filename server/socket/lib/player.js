const Room = require("./room");

class Player {

    /**
     * @type {Room}
     */
    room = null;

    /**
     * @param {string} username 
     */
    constructor(username) {
        this.username = username;
    }

}

module.exports = Player;