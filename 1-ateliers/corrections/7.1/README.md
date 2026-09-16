# Correction atelier 7.1 : Socket.io

## Installation et lancement

```bash
npm install
npm run dev
```

---

## Sources

<!-- AUTO-GENERATED -->

### 1-ateliers/corrections/7.1

#### `1-ateliers/corrections/7.1/package.json`

```json
{
  "name": "7.1",
  "version": "1.0.0",
  "main": "index.js",
  "type":"module",
  "scripts": {
    "dev": "node --watch server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "express": "^5.2.1",
    "socket.io": "^4.8.3"
  }
}

```

#### `1-ateliers/corrections/7.1/public/css/main.css`

```css
body {
    margin: 2rem;
}

#messages {
    list-style-type: none;
    padding: 0;
    margin: 1rem;
}

#messages li {
    padding: 0.5rem;
    margin-bottom: 0.25rem;
    border-radius: 4px;
}

#messages li:nth-of-type(even) {
    background: #fafad2;
}

#messages li:nth-of-type(odd) {
    background: #20b2aa;
    color: #f5deb3;
}
```

#### `1-ateliers/corrections/7.1/public/index.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Socket.io</title>
  <link rel="stylesheet" href="/css/main.css">
</head>
<body>
  <h1>Chat</h1>
  <ul id="messages"></ul>
  <form id="form">
    <input id="input" autocomplete="off" placeholder="Tapez un message..." /><button>Envoyer</button>
  </form>
  <!-- Script Socket.io fourni automatiquement par le serveur Node -->
  <script src="/socket.io/socket.io.js"></script>
  <script src="/javascript/main.js"></script>
</body>
</html>
```

#### `1-ateliers/corrections/7.1/public/javascript/main.js`

```javascript
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

```

#### `1-ateliers/corrections/7.1/server.js`

```javascript
import express from 'express'
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = resolve(dirname(fileURLToPath(import.meta.url)))
const app = express();
app.use(express.static(join(__dirname, 'public')));
const httpServer = createServer(app);
const io = new Server(httpServer);

// Sert le fichier HTML statique depuis le dossier courant
app.get('/', (req, res) => {
  res.sendFile(join(__dirname,  'public', 'index.html'));
});

// Gestion des connexions Socket.io
io.on('connection', (socket) => {
  console.log(`Un utilisateur s'est connecté : ${socket.id}`);

  // Écoute de l'événement personnalisé 'chat message' envoyés par un client
  socket.on('chat:message', (msg) => {
    // Rediffuse le message à TOUS les clients connectés
    io.emit('chat:message', msg);
  });

  // Événement déclenché à la déconnexion du client
  socket.on('disconnect', () => {
    console.log(`Utilisateur déconnecté : ${socket.id}`);
  });
});

const PORT = 7100;
httpServer.listen(PORT, () => {
  console.log(`Running http://localhost:${PORT}`);
});
```

<!-- END AUTO-GENERATED -->