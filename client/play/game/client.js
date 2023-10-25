const socket = new WebSocket("ws://" + location.hostname + ":8080/api/socket");

// Heartbeat JoinPacket until one is responded to
let joinAttemptHeartbeat;
socket.addEventListener("open", () => {

    joinAttemptHeartbeat = setInterval(() => {
        let joinPacket = new JoinPacket();
        joinPacket.send();
    }, 300);

});

eventBus.listen("JOIN", () => {
    clearInterval(joinAttemptHeartbeat);
});

// Display disconnect message upon closure
socket.addEventListener("close", event => {

    let reason = event.reason.length == 0 ? "Closed by remote host" : event.reason;
    alert("Connection closed:\n" + reason);

    location.href = "/dash";

});

socket.addEventListener("message", event => {

    let packet = JSON.parse(event.data);

    for (let listener of eventBus.listenersOf(packet.type)) {
        listener(packet);
    }

});