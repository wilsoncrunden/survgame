const { Router } = require("express");

/**
 * @type {Router}
 */
const router = new Router();

router.post("/api/register", (req, res) => {

    console.log(req.body);

    res.redirect("/");

});

module.exports = router;