$("#shareLink").val(`${location.protocol}//${location.host}/play/${roomCode}`);

$("#copyShareLinkButton").click(() => {
   
    navigator.clipboard.writeText($("#shareLink").val());

});

$("#disconnectButton").click(() => {

    location.href = "/dash";

});