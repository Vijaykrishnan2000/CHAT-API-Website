// Handles chat form submission
const chatForm = document.getElementById('chat-form');
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');

chatForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const message = userInput.value.trim();
    if (message) {
        appendMessage('You', message);
        userInput.value = '';
        // Call your chatbot function here (to be implemented)
        handleUserMessage(message);
    }
});

function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = `${sender}: ${text}`;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function handleUserMessage(message) {
    // Placeholder for chatbot logic
    
    console.log(`User message: ${message}`);
}
