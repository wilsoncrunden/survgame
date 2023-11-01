$("#shareLink").val(location.href);

$("#copyShareLinkButton").click(() => {

    navigator.clipboard.writeText(location.href);

});

$("#disconnectButton").click(() => {

    location.href = "/dash";

});