const { Router } = require("express");

const socket = require("../socket/socket");

/**
 * @type {Router}
 */
const router = new Router();

router.post("/api/room", (req, res) => {

    let {
        roomCode = ""
    } = req.body;

    let requestedRoom = socket.roomWithCode(roomCode);
    if (requestedRoom == null) {
        return res.json({
            "exists": false
        });
    }

    res.json({
        "exists": true,
        "players": requestedRoom.usernames()
    });

});

module.exports = router;