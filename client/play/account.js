fetch("/api/profile", {
    "method": "GET"
}).then(async res => {
    let { username } = await res.json();

    $("#username").html(`Connected to ${roomCode.toUpperCase()} as ${username}`);
});