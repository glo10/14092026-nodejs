import { readFileSync } from "node:fs";
import { createServer } from "node:https";

/**
 * Certif à générer cf. via un site externe ou la commande openssl depuis un terminal
 * openssl req -newkey rsa:2048 -nodes -keyout mondomaine.key -out mondomaine.csr -subj "/CN=mondomaine.fr"
 * @see https://www.devglan.com/online-tools/generate-self-signed-cert
*/
const options = {
  key: readFileSync('certifs/private.pem'),
  cert: readFileSync('certifs/certificate.crt')
}

createServer(options, (req, res) => {
  // Décomposition de l'objet http.incomingMessage (Request)
  const { url, ip, host, method, headers } = req;
  console.log("url", url, "method", method);
  const headersResponse = { "content-type": "text/html; charset=utf-8" };
  if (method === "GET") {
    switch (req.url) {
      case "/":
        res.writeHead(200, headersResponse);
        res.write("<h1>Bienvenue</h1>");
        res.write("<h2>Page accueil</h2>");
        break;
      case "/news":
        res.writeHead(200, headersResponse);
        res.write("<h1>Actualité</h1>");
        break;
      default:
        res.writeHead(404, headersResponse);
        res.write("<h1>404</h1>");
        break;
    }
    res.end(); // ferme et renvoie la réponse au client
  } else {
    res.writeHead(403, headersResponse)
    res.end('Méthode non acceptée')
  }
}).listen(8443, () => console.log(`https://localhost:8443`));
