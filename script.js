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

async function handleUserMessage(message) {
    // Placeholder for chatbot logic
    console.log(`User message: ${message}`);
    console.log('Sending message to Salesforce Apex REST API test live website...');

    /*const response = await fetch('https://agentforce-vijaykriss-dev-ed.my.salesforce.com/services/apexrest/AgentAction/', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN_HERE',  // Replace this with a valid access token
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    });

    if (response.ok) {
        console.log('Message sent successfully');
    } else {
        console.error('Failed to send message', await response.text());
    }*/
}
