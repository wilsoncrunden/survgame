let createAttempts = 0;
$("#createWorldButton").click(() => {
    if (++createAttempts == 10) {
        alert("it's not gonna do anything bro what are you doing");
    }
});