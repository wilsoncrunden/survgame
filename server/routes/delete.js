const { Router } = require("express");

const database = require("../lib/database");
const session = require("../lib/session");

/**
 * @type {Router}
 */
const router = new Router();

router.get("/api/delete", async (req, res) => {

    if (req.username == null) {
        return res.sendStatus(400);
    }

    await session.update(req.username, null);
    await database.executeQuery("DELETE FROM accounts WHERE username = ?", [req.username]);

    res.sendStatus(200);

});

module.exports = router;