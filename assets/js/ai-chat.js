const input = document.getElementById("chat-input");
const button = document.getElementById("chat-send");
const messages = document.getElementById("chat-messages");

const toggleButton = document.getElementById("chat-toggle");
const chatPanel = document.getElementById("chat-panel");
const closeButton = document.getElementById("close-chat");

/* OPEN/CLOSE */

toggleButton.addEventListener("click", () => {
  chatPanel.classList.toggle("open");
});

closeButton.addEventListener("click", () => {
  chatPanel.classList.remove("open");
});

/* SEND MESSAGE */

async function sendMessage() {

  const message = input.value.trim();

  if (!message) {
    return;
  }

  messages.innerHTML += `
    <div class="chat-message user">
      <div class="message-content">${message}</div>
    </div>
  `;

  input.value = "";

  messages.scrollTop = messages.scrollHeight;

  try {

    const response = await fetch("https://resume-chat-bot-2h6s.onrender.com/chat", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        message: message,
        profile: aiProfile
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }

    messages.innerHTML += `
      <div class="chat-message ai">
        <div class="message-content">${data.reply}</div>
      </div>
    `;

  } catch (error) {

    console.error(error);

    messages.innerHTML += `
      <div class="chat-message ai">
        <div class="message-content">Error: ${error.message}</div>
      </div>
    `;
  }

  messages.scrollTop = messages.scrollHeight;
}

/* BUTTON */

button.addEventListener("click", sendMessage);

/* ENTER KEY */

input.addEventListener("keypress", (e) => {

  if (e.key === "Enter") {
    sendMessage();
  }

});