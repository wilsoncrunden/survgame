const { Router } = require("express");
const bcrypt = require("bcrypt");
const fetch = require("node-fetch");

const database = require("../lib/database");
const session = require("../lib/session");

/**
 * @type {Router}
 */
const router = new Router();

function verifyCredentials(res, username, password) {
    // Username should be between 3-18 characters long
    if (username.length < 3 || username.length > 18) {
        res.status(400).send("Username must be 3-18 characters long.");
        return false;
    }

    // Username should be alphanumeric including _
    if (/\W/.test(username)) {
        res.status(400).send("Username must be alphanumeric including _");
        return false;
    }

    // Username cannot have repeating _'s
    if (/_{2,}/.test(username)) {
        res.status(400).send("Username cannot have repetitive _'s.");
        return false;
    }

    // Password should be between 8-64 characters long
    if (password.length < 8 || password.length > 64) {
        res.status(400).send("Password must be 8-64 characters long.");
        return false;
    }

    // Password should have 1 lower and upper case letter
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
        res.status(400).send("Password needs lower and upper case letters.");
        return false;
    }

    // Password should have 1 symbol
    if (!/[\W_]/.test(password)) {
        res.status(400).send("Password needs at least one symbol.");
        return false;
    }

    // Password cannot have 3 consecutive repeating letters
    if (/(.)\1{2,}/.test(password)) {
        res.status(400).send("Password has repetitive characters.");
        return false;
    }

    // Password cannot contain the username
    if (password.toLowerCase().includes(username.toLowerCase())) {
        res.status(400).send("Password cannot contain your username.");
        return false;
    }

    return true;
}

async function verifyCaptcha(token) {
    try {
        let verificationRequest = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "body": `secret=${process.env.RECAPTCHA_SECRET}&response=${token}`
        });
        let verificationResult = await verificationRequest.json();

        return verificationResult.success;
    } catch (err) {
        console.log(err.toString());
        return false;
    }
}

router.post("/api/register", async (req, res) => {

    let { 
        username = "",
        password = "", 
        confirmPassword = "", 
        captchaToken = "" 
    } = req.body;

    if (await database.accountExists(username)) {
        return res.status(400).send("An account with this username already exists.");
    }

    if (password != confirmPassword) {
        return res.status(400).send("Passwords do not match.");
    }

    if (!verifyCredentials(res, username, password)) {
        return;
    }
    
    // if (!await verifyCaptcha(captchaToken)) {
    //     return res.status(400).send("You must complete the CAPTCHA.");
    // }

    let hashedPassword = await bcrypt.hash(password, 10);
    database.executeQuery("INSERT INTO accounts (username, password) VALUES(?, ?)", [username, hashedPassword]);

    let sessionToken = session.generate();
    await session.update(username, sessionToken);
    res.cookie(session.COOKIE_NAME, sessionToken);

    res.sendStatus(200);

});

module.exports = router;