$("#registerButton").click(async () => {

    let username = $("#username").val();
    let password = $("#password").val();
    let confirmPassword = $("#confirmPassword").val();
    let captchaToken = grecaptcha.getResponse();

    try {
        let registrationAttempt = await fetch("/api/register", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                username, password, confirmPassword, captchaToken
            })
        });

        if (registrationAttempt.status == 400) {
            $("#error").html(await registrationAttempt.text());
        }
    } catch (err) {
        $("#error").html("Unknown error.");
    }

});