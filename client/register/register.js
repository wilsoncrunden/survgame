$("#registerButton").click(async () => {

    let username = $("#username").val();
    let password = $("#password").val();
    let confirmPassword = $("#confirmPassword").val();

    try {
        let registrationAttempt = await fetch("/api/register", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                username, password, confirmPassword
            })
        });

        if (registrationAttempt.status == 400) {
            $("#error").html(await registrationAttempt.text());
        }
    } catch (err) {
        $("#error").html("Unknown error.");
    }

});