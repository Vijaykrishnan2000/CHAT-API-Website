const chatForm = document.getElementById("chat-form");
const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const micBtn = document.getElementById("mic-btn");
const imageUpload = document.getElementById("imageUpload");

// Avatars
const userAvatar = "https://cdn-icons-png.flaticon.com/512/1946/1946429.png";
const botAvatar = "https://cdn-icons-png.flaticon.com/512/4712/4712035.png";

let sessionId = null;
let base64File = null;
let fileName = null;

// Handle image file selection
imageUpload.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    fileName = file.name;
    const reader = new FileReader();
    reader.onload = function () {
      base64File = reader.result.split(",")[1]; // Extract base64 data without metadata
      // Display image preview in chat
      const imagePreview = `<div style="margin-top: 8px;"><img src="${reader.result}" alt="${fileName}" style="max-width: 200px; max-height: 150px; border-radius: 8px; border: 1px solid #e3eaf5;"></div>`;
      appendMessage("You", `Image added: ${fileName}${imagePreview}`, "user");
      console.log("Image loaded:", fileName);
    };
    reader.readAsDataURL(file);
  }
});

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = userInput.value.trim();
  if (!message && !base64File) return; // Require either message or image

  // Show user message (only if there's text or if no image was previewed)
  if (message) {
    appendMessage("You", message, "user");
  }
  userInput.value = "";
  try {
    // Determine which endpoint to use based on whether image is attached
    let endpoint = "/.netlify/functions/salesforceProxy";
    let requestPayload = { message: message, sessionId: sessionId };

    if (base64File && fileName) {
      endpoint = "/.netlify/functions/imageUpload";
      requestPayload.fileName = fileName;
      requestPayload.fileData = base64File;
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestPayload)
    });
    console.log("Request sent to:", endpoint, requestPayload);

    const data = await response.json(); // Parse JSON response
    if (data.sessionId) {
      sessionId = data.sessionId;
    }
    appendMessage("Salesforce", data.agentResponse, "bot");
    console.log("Response received from Salesforce Proxy:", JSON.stringify(data));

    // Clear image after sending
    base64File = null;
    fileName = null;
    imageUpload.value = "";
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
