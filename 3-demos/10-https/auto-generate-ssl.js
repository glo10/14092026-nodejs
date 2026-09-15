import { exec } from 'node:child_process'
// Attention à exécuter à la racine du projet : node auto-generate-ssl.js car nous n'avons pas encore vu la gestion des urls et chémins
// Générer une clé privée et un certificat auto-signé valable 90 jours
const command = 'openssl req -x509 -newkey rsa:2048 -keyout certifs/private.pem -out certifs/certificate.crt -days 90 -nodes -subj "/CN=localhost"';

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erreur : ${error.message}`);
    return;
  }
  console.log('stdout', stdout, 'stderr', stderr)
  console.log('Certificat et clé générés avec succès !');
});
