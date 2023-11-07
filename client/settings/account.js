fetch("/api/profile", {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
}).then(async res => {
    let profile = await res.json();

    $("#username").html(profile.username);

    let joinDate = new Date(profile.joinTimestamp * 1000);
    $("#joinDate").html(`Account joined ${joinDate.getDate()}/${joinDate.getMonth() + 1}/${joinDate.getFullYear()}`);
});