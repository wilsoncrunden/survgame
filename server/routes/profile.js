const { Router } = require("express");

const database = require("../lib/database");

/**
 * @type {Router}
 */
const router = new Router();

router.post("/api/profile", async (req, res) => {

    let {
        username = req.username
    } = req.body;
    
    if (!username) {
        return res.sendStatus(400);
    }

    try {
        var matchingAccounts = await database.executeQuery("SELECT username, joinTimestamp FROM accounts WHERE username = ?", [username]);
    } catch (err) {
        return res.json({
            "exists": false
        });
    }

    if (matchingAccounts.length > 0) {
        matchingAccounts[0].exists = true;
        res.json(matchingAccounts[0]);
    } else {
        res.json({
            "exists": false
        });
    }

});

module.exports = router;