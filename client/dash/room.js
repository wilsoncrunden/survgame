$("#joinPublicRoomButton").click(() => {

    location.href = "/play/public";

});

$("#joinRoomCodeButton").click(() => {

    let roomCode = $("#roomCode").val();

    if (roomCode.length == 6) {
        location.href = "/play/" + roomCode;
    }

});