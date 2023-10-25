$("#joinPublicRoomButton").click(() => {

    location.href = "/play/public";

});

$("#joinRoomCodeButton").click(async () => {

    let roomCode = $("#roomCode").val();

    try {
        let roomRequest = await fetch("/api/room", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({ roomCode })
        });
        let room = await roomRequest.json();

        if (room.exists) {
            location.href = "/play/" + roomCode.toLowerCase();
        } else {
            $("#joinRoomCodeMessage").html("A room with that code does not exist.");
        }
    } catch (err) {
        $("#joinRoomCodeMessage").html("Unknown error.")
    }

});