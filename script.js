const chatForm = document.getElementById("chat-form");
const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const micBtn = document.getElementById("mic-btn");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = userInput.value.trim();
  if (!message) return;

  // Show user message
  appendMessage("You", message);
  userInput.value = "";
  console.log('Script User message:'+message);
  try {
    const response = await fetch("/.netlify/functions/salesforceProxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: message })
    });

    const reply = await response.text(); // or response.json() if it's JSON
    console.log('Script Salesforce reply:'+reply); 
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

// Voice recognition setup
let recognition;
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  micBtn.addEventListener("click", () => {
    recognition.start();
    micBtn.disabled = true;
    micBtn.innerHTML = '<span>🎙️</span>';
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    userInput.value = transcript;
  };

  recognition.onend = () => {
    micBtn.disabled = false;
    micBtn.innerHTML = '<span>🎤</span>';
  };

  recognition.onerror = (event) => {
    micBtn.disabled = false;
    micBtn.innerHTML = '<span>🎤</span>';
    alert('Voice recognition error: ' + event.error);
  };
} else {
  micBtn.style.display = 'none'; // Hide mic if not supported
}
