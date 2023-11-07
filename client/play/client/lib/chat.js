const chatBox = document.querySelector("#chatMessagesArea");

let notificationCount = 0;

function addPlayerChatMessage(username, message) {

    let messageContainer = document.createElement("span");
    messageContainer.innerHTML = `<b style="color:#eb144c">${username}</b>: ${message}`;
    chatBox.appendChild(messageContainer);

    chatBox.scrollTop = chatBox.scrollHeight;

    wipeOldChatMessages();
    pushChatMessageNotification();

}

function addSystemChatMessage(message) {

    let messageContainer = document.createElement("span");
    messageContainer.innerHTML = `<b style=color:#ff9f46>${message}</b>`;
    chatBox.appendChild(messageContainer);

    chatBox.scrollTop = chatBox.scrollHeight;

    wipeOldChatMessages();
    pushChatMessageNotification();

}

function pushChatMessageNotification() {

    if (document.hidden) {
        document.title = `survgame - Play (${++notificationCount})`;
    }

}

function wipeOldChatMessages() {

    if (chatBox.children.length > 30) {
        chatBox.children.item(0).remove();
    }

}

document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        notificationCount = 0;
        document.title = "survgame - Play";
    }
});