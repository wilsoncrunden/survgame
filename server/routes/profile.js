const { Router } = require("express");

/**
 * @type {Router}
 */
const router = new Router();

router.get("/api/profile", async (req, res) => {

    if (req.username == null) {
        return res.sendStatus(400);
    }

    res.status(200).json({
        "username": req.username
    });

});

module.exports = router;