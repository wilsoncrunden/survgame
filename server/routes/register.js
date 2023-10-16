const { Router } = require("express");

/**
 * @type {Router}
 */
const router = new Router();

const legalCharacters = "abcdefghijklmnopqrstuvwxyz0123456789_".split("");

router.post("/api/register", (req, res) => {

    let { username, password, confirmPassword } = req.body;

    // Password should match the confirm password
    if (password != confirmPassword) {
        return res.status(400).send("Passwords do not match.");
    }

    // Usernames should be between 3-18 characters long
    if (username.length < 3 || username.length > 18) {
        return res.status(400).send("Username must be 3-18 characters long.");
    }

    // Passwords should be between 8-64 characters long
    if (password.length < 8 || password.length > 64) {
        return res.status(400).send("Password must be 8-64 characters long.");
    }

    // Usernames should be alphanumeric including _
    if (username.split("").some(letter => !legalCharacters.includes(letter.toLowerCase()))) {
        return res.status(400).send("Username must be alphanumeric including _");
    }

});

module.exports = router;