fetch("/api/profile", {
    "method": "GET"
}).then(async res => {
    let { username } = await res.json();

    $("#connectionMessage").html(`Connected to ${roomCode.toUpperCase()} as ${username}`);
});