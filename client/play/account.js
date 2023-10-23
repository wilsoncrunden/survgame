fetch("/api/profile", {
    "method": "GET"
}).then(async res => {
    let profile = await res.json();

    $("#username").html("Logged in as " + profile.username);
});