const chatBox = document.querySelector("#chatMessagesArea");

function addPlayerChatMessage(username, message) {

    let messageContainer = document.createElement("span");
    messageContainer.innerHTML = `<b style="color:#eb144c">${username}</b>: ${message}`;

    chatBox.appendChild(messageContainer);

    chatBox.scrollTop = chatBox.scrollHeight;

    wipeOldChatMessages();

}

function addSystemChatMessage(message) {

    let messageContainer = document.createElement("span");
    messageContainer.innerHTML = `<b style=color:#ff9f46>${message}</b>`;

    chatBox.appendChild(messageContainer);

    chatBox.scrollTop = chatBox.scrollHeight;

    wipeOldChatMessages();

}

function wipeOldChatMessages() {

    if (chatBox.children.length > 30) {
        chatBox.children.item(0).remove();
    }

}