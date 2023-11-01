const type = "join";

function dispatch(client, roomCode, token) {
    console.log(`Joining ${roomCode} with ${token}`);
}

module.exports = { type, dispatch };