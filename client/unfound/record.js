let recordPlayer = null;
let rotation = 0;

let track = document.querySelector("#track");

$("#playButton").click(() => {

    $("#resetButton").css("display", "inline");

    if (!recordPlayer) {
        track.play();
        recordPlayer = setInterval(() => {
            $("#recordPlayer").css("transform", `rotate(${rotation}deg)`);
            rotation = (rotation + 1) % 360;
        }, 10);
    } else {
        recordPlayer = clearInterval(recordPlayer);
        track.pause();
    }
    
});

$("#resetButton").click(() => {

    rotation = 0;
    $("#recordPlayer").css("transform", "rotate(0deg)");
    track.currentTime = 0;

});