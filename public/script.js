const messagesDiv = document.querySelector('.messages');
const sendBtn = document.querySelector('.send-btn');
const messageInput = document.querySelector('.message-input');

const ws = new WebSocket('ws://localhost:5000');

ws.onopen = () => {
    console.log('Connected to the WebSocket Server');
};

ws.onmessage = (event) => {
    if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = function () {
            const text = reader.result;
            displayMessage(text);
        };
        reader.readAsText(event.data);
    } else {
        displayMessage(event.data);
    }
};

function displayMessage(message) {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = `Outro usuário: ${message}`;
    messagesDiv.appendChild(msgDiv);
}

sendBtn.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() === "") return;
    ws.send(message);
    const msgDiv = document.createElement('div');
    messagesDiv.appendChild(msgDiv);
    messageInput.value = '';
})