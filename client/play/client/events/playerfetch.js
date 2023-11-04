socket.on("player_fetch", players => {

    $("#chatPlayerCount").attr("title", players.join("\n"));
    $("#chatPlayerCount").html(players.length + " Online");
    
});