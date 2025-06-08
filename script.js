const chatForm = document.getElementById("chat-form");
const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = userInput.value.trim();
  if (!message) return;

  // Show user message
  appendMessage("You", message);
  userInput.value = "";

  try {
    const response = await fetch("/.netlify/functions/salesforceProxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userMessage: message })
    });

    const reply = await response.text(); // or response.json() if it's JSON
    appendMessage("Salesforce", reply);
  } catch (error) {
    console.error("Error sending message:", error);
    appendMessage("Error", "Could not reach Salesforce.");
  }
});

function appendMessage(sender, message) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message");
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
