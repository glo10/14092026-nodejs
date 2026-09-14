import { createServer } from "node:http";
import { loadEnvFile } from 'node:process';
loadEnvFile()
createServer(function (req, res) {
  // Traitement de la requête, voir les infos de la requête et renvoyer une réponse
  const { method, url } = req;
  if (method === "GET" && url === "/") {
    // Renvoyer une réponse avec des en-têtes HTTP (code HTTP, type de contenu, etc.)
    res.writeHead(200, { "Content-Type": "text/html" });
    // Le corps de la réponse (body)
    res.write("<h1>Mon premier serveur Web</h1>");
    res.write("<h2>Avec node:http</h2>");
    res.end(); // fermeture et renvoi la réponse au client
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end('<h1>Page 404</h1></h2>Contenu introuvable</h2>')
  }
}).listen(process.env.PORT, () => {
  console.log(`running ${process.env.APP_DOMAIN}`);
});
