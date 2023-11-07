socket.on("player_fetch", players => {

    let remainingPlayers = players.length > 10 ? `\n...and ${players.length - 10} more` : "";

    $("#chatPlayerCount").attr("title", `${players.join("\n")}${remainingPlayers}`);
    $("#chatPlayerCount").html(players.length + " Online");
    
});