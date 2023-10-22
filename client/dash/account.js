fetch("/api/profile", {
    "method": "GET"
}).then(async res => {
    let profile = await res.json();

    $("#username").html("Logged in as " + profile.username);
});

$("#logoutButton").click(async () => {

    try {
        await fetch("/api/logout", {
            "method": "GET"
        });
    } catch (err) {}

    location.href = "/login";

});

$("#deleteAccountButton").click(async () => {

    let confirmation = prompt("Are you sure you want to delete your account? Type CONFIRM below to confirm:");
    if (confirmation != "CONFIRM") return;

    try {
        await fetch("/api/delete", {
            "method": "GET"
        });
    } catch (err) {}

    location.href = "/register";

});