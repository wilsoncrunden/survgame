eventBus.listen("PLAYER_FETCH", packet => {

    let {
        players
    } = packet;

    $("#chatPlayerCount").html(players.length + " online");

    let firstTenPlayers = players.slice(0, 10).join("\n");
    if (players.length <= 10) {
        $("#chatPlayerCount").attr("title", firstTenPlayers);
    } else {
        $("#chatPlayerCount").attr("title", `${firstTenPlayers}\n...and ${players.length - 10} more`);
    }

});