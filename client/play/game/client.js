const socket = new WebSocket("ws://" + location.hostname + ":" + location.port + "/api/socket");

let joinAttemptHeartbeat;
socket.addEventListener("open", () => {
    joinAttemptHeartbeat = setInterval(() => {
        let joinPacket = new JoinPacket();
        joinPacket.send();
    }, 300);
});

socket.addEventListener("close", event => {

    let reason = event.reason.length == 0 ? "Closed by remote host" : event.reason;
    alert(`Connection closed with code ${event.code}:\n${reason}`);

    location.href = "/dash";

});

socket.addEventListener("message", event => {

    let packet = JSON.parse(event.data);

    for (let listener of eventBus.listenersOf(packet.type)) {
        listener(packet);
    }

});