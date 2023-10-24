const mysql = require("mysql");
const bcrypt = require("bcrypt");

const database = mysql.createConnection({
    "host": process.env.MYSQL_HOST,
    "user": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE
});

/**
 * @description Queries database and returns results as JSON array
 */
async function executeQuery(query, params = []) {
    return new Promise((res, rej) => {
        database.query(query, params, (error, results) => {
            if (error) {
                rej(error);
            } else {
                res(results);
            }
        });
    });
}

/**
 * @description Returns whether or not an account with the given username exists
 */
async function accountExists(username) {
    try {
        let matchingAccounts = await executeQuery("SELECT * FROM accounts WHERE username = ?", [username]);
        return matchingAccounts.length > 0;
    } catch (err) {
        return false;
    }
}

/**
 * @description Compares the password hash of a given username with a guess
 */
async function comparePassword(username, guess) {
    let matchingAccounts = await executeQuery("SELECT * FROM accounts WHERE username = ?", [username]);

    if (matchingAccounts.length == 0) {
        return false;
    }

    try {
        return await bcrypt.compare(guess, matchingAccounts[0].password);
    } catch (err) {
        return false;
    }
}

/**
 * @description Periodically sends heartbeat query to keep connection alive
 */
function keepalive() {
    setInterval(() => {
        executeQuery("SELECT 1");
    }, 3000);
}

module.exports = {
    executeQuery,
    accountExists,
    comparePassword,
    keepalive
};