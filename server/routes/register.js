const { Router } = require("express");
const bcrypt = require("bcrypt");
const fetch = require("node-fetch");

const database = require("./../database");

/**
 * @type {Router}
 */
const router = new Router();

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
        username, 
        password, 
        confirmPassword, 
        captchaToken 
    } = req.body;

    // Username should be between 3-18 characters long
    if (username.length < 3 || username.length > 18) {
        return res.status(400).send("Username must be 3-18 characters long.");
    }

    // Username should be alphanumeric including _
    if (/\W/.test(username)) {
        return res.status(400).send("Username must be alphanumeric including _");
    }

    // Username must begin with a letter
    if (/^[^a-z]/i.test(username)) {
        return res.status(400).send("Username must start with a letter.");
    }

    // Username cannot have repeating _'s
    if (/_{2,}/.test(username)) {
        return res.status(400).send("Username cannot have repetitive _'s.");
    }

    // Password should match the confirm password
    if (password != confirmPassword) {
        return res.status(400).send("Passwords do not match.");
    }

    // Password should be between 8-64 characters long
    if (password.length < 8 || password.length > 64) {
        return res.status(400).send("Password must be 8-64 characters long.");
    }

    // Password should have 1 lower and upper case letter
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
        return res.status(400).send("Password needs lower and upper case letters.");
    }

    // Password should have 1 symbol
    if (!/[\W_]/.test(password)) {
        return res.status(400).send("Password needs at least one symbol.");
    }

    // Password cannot have 3 consecutive repeating letters
    if (/(.)\1{2,}/.test(password)) {
        return res.status(400).send("Password has repetitive characters.");
    }

    // Password cannot contain the username
    if (password.toLowerCase().includes(username.toLowerCase())) {
        return res.status(400).send("Password cannot contain your username.");
    }

    // Captcha must be complete and valid
    if (!(await verifyCaptcha(captchaToken))) {
        return res.status(400).send("You must complete the CAPTCHA.");
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    
    console.log("Thanks for logging in bro");

    let thing = await database.executeQuery("SELECT * FROM accounts");
    console.log(thing);

});

module.exports = router;