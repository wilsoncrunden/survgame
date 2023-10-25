eventBus.listen("JOIN", () => {

    // Stop sending heartbeat join packets
    clearInterval(joinAttemptHeartbeat);

    // Fetch online players for updated player count
    let playerFetchPacket = new PlayerFetchPacket();
    playerFetchPacket.send();

});

eventBus.listen("QUIT", () => {

    // Fetch online players for updated player count
    let playerFetchPacket = new PlayerFetchPacket();
    playerFetchPacket.send();

});