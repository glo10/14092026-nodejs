const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

// Émission du message lors de la soumission du formulaire
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat:message", input.value);
    input.value = "";
  }
});

// Réception des messages diffusés par le serveur
socket.on("chat:message", (msg) => {
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
});
