const { Router } = require("express");

const session = require("./../session");

/**
 * @type {Router}
 */
const router = new Router();

router.get("/api/logout", async (req, res) => {

    if (req.username == null) {
        return res.sendStatus(400);
    }

    await session.update(req.username, null);

    res.sendStatus(200);

});

module.exports = router;