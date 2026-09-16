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