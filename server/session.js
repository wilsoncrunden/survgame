const uuid = require("uuid");

const database = require("./database");

const COOKIE_NAME = "survgame_session_token";

/**
 * @description Returns new, random session token
 */
function generate() {
    return uuid.v4();
}

/**
 * @description Returns session token given a cookie string or null
 */
function extract(cookie) {
    let cookies = cookie.match(/[^; ]+=.+?(?=;|$)/g) ?? [];
    let cookieMap = Object.fromEntries(cookies.map(pair => pair.split("=")));
    return cookieMap[COOKIE_NAME] ?? null;
}

/**
 * @description Returns username associated with given token or null
 */
async function usernameOf(token) {
    try {
        let sessions = await database.executeQuery("SELECT username FROM sessions WHERE token = ?", [token]);
        return sessions.length == 0 ? null : sessions[0].username;
    } catch (err) {
        return null;
    }
}

/**
 * @description Inserts or updates an accounts session token in the database
 */
async function update(username, token) {
    let matchingSessions = await database.executeQuery("SELECT * FROM sessions WHERE username = ?", [username]);
    if (matchingSessions.length == 0) {
        await database.executeQuery("INSERT INTO sessions (username, token) VALUES(?, ?)", [username, token]);
    } else {
        await database.executeQuery("UPDATE sessions SET token = ? WHERE username = ?", [token, username]);
    }
}

/**
 * @description Adds session token and associated username to requests (under req.session & req.username; may be nulls)
 */
async function parser(req, res, next) {
    req.session = extract(req.headers.cookie ?? "");
    req.username = await usernameOf(req.session);
    next();
}

module.exports = {
    COOKIE_NAME,

    generate,
    extract,
    usernameOf,
    update,
    parser
};