fetch("/api/room", {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    },
    "body": JSON.stringify({ "roomCode": "public" })
}).then(async res => {

    let room = await res.json();
    $("#publicRoomPlayerCount").html(`${room.players.length} player${room.players.length == 1 ? "" : "s"} online`);

    let remainingPlayers = room.players.length > 10 ? `\n...and ${room.players.length - 10} more` : "";
    $("#publicRoomPlayerCount").attr("title", `${room.players.join("\n")}${remainingPlayers}`);

}).catch(err => {

    $("#publicRoomPlayerCount").css("color", "var(--secondary-color)");
    $("#publicRoomPlayerCount").html("Couldn't connect");

});

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
        $("#joinRoomCodeMessage").html("This is still under development.");
    }

});