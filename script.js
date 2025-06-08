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

    // Step 1: Get Access Token from Salesforce
    console.log("Requesting access token from Salesforce...");
    const tokenResponse = await fetch("https://login.salesforce.com/services/oauth2/token", {
        method: "POST",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
        grant_type: "password",
        client_id: "3MVG9dAEux2v1sLtg4lmb4zhS6Pm1WapDQ2j_fVl4AGyt1o6Xr8hU_Z7bnZLUP.FKwjGRMl4FnymNFcKdpxnE",
        client_secret: "85D3C163EBCE3EDA1A43B34FBDAD11082CE76414DB656B1FF177C0BF17FE7CD1",
        username: "vijaykrishnan@agentforce.com",
        password: "NarutoTest@1374900719j6WpaR4zmSUQb0tuBF9ceI"
        })
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
        console.error("Failed to get access token:", tokenData);
        return;
    }

    // Step 2: Send Data to Your Apex REST Endpoint
    const apiResponse = await fetch("https://agentforce-vijaykriss-dev-ed.my.salesforce.com/services/apexrest/AgentAction/", {
        method: "POST",
        headers: {
        "Authorization": "Bearer " + tokenData.access_token,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        message: message
        })
    });

    const result = await apiResponse.json();
    console.log("Salesforce Response:", result);


}
