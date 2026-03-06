const chatForm = document.getElementById("chat-form");
const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const micBtn = document.getElementById("mic-btn");

// Avatars
const userAvatar = "https://cdn-icons-png.flaticon.com/512/1946/1946429.png";
const botAvatar = "https://cdn-icons-png.flaticon.com/512/4712/4712035.png";

let sessionId = null;

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = userInput.value.trim();
  if (!message) return;

  // Show user message
  appendMessage("You", message, "user");
  userInput.value = "";
  try {
    const response = await fetch("/.netlify/functions/salesforceProxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: message, sessionId: sessionId })
    });
    console.log("Request sent to Salesforce Proxy:", { message, sessionId });

    const data = await response.json(); // Parse JSON response
    if (data.sessionId) {
      sessionId = data.sessionId;
    }
    appendMessage("Salesforce", data.agentResponse, "bot");
    console.log("Response received from Salesforce Proxy:", JSON.stringify(data));
  } catch (error) {
    appendMessage("Error", "Could not reach Salesforce.", "bot");
  }
});

function appendMessage(sender, message, type) {
  const row = document.createElement("div");
  row.classList.add("message-row", type);

  const avatar = document.createElement("div");
  avatar.classList.add("avatar");
  avatar.innerHTML = `<img src="${type === "user" ? userAvatar : botAvatar}" alt="${sender}" style="width:100%;height:100%;border-radius:50%;">`;

  const bubble = document.createElement("div");
  bubble.classList.add("message-bubble");
  bubble.innerHTML = `<strong style="font-size:0.92em;font-weight:600;">${sender}</strong><br>${message}`;

  if (type === "user") {
    row.appendChild(bubble);
    row.appendChild(avatar);
  } else {
    row.appendChild(avatar);
    row.appendChild(bubble);
  }

  chatWindow.appendChild(row);
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
