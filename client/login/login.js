$("#loginButton").click(async () => {

    let username = $("#username").val();
    let password = $("#password").val();

    try {
        let loginAttempt = await fetch("/api/login", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                username, password
            })
        });

        if (loginAttempt.status == 400) {
            $("#error").html(await loginAttempt.text());
        } else {
            location.href = "/dash";
        }
    } catch (err) {
        $("#error").html("Unknown error.");
    }

});