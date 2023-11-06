const { Router } = require("express");

const survgame = require("../socket/server");

/**
 * @type {Router}
 */
const router = new Router();

router.post("/api/room", async (req, res) => {

    let {
        roomCode = ""
    } = req.body;

    try {
        var sockets = await survgame.in(roomCode).fetchSockets();
    } catch (err) {
        return res.sendStatus(400);
    }

    // Implement other keys in future
    res.json({
        "players": sockets.map(socket => socket.player.username)
    });

});

module.exports = router;