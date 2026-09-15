import { readFileSync } from "node:fs";
import { createServer } from "node:https";
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const currentFilePath = fileURLToPath(import.meta.url) // transformation URL en chemin
const __dirname = dirname(currentFilePath)
const rootDir = resolve(__dirname) // Créer un chemin absolu
const certifsDir = join(rootDir, 'certifs')
const privateFilename = join(certifsDir, 'private.pem')
const certificateFilename = join(certifsDir, 'certificate.crt')
console.log('dossier certifs', privateFilename, certificateFilename);


/**
 * Résolution manuelle 
 *  Chemin final E:/folder/../../demos/index.mjs (indirect)
 * Avec resolve()
 *  E:/demos/index.mjs (direct)
 */
const myPath = '../../demos/index.mjs'

/**
 * Certif à générer cf. via un le script node auto-generate-ssl.js ou le site externe ci-dessous ou la commande openssl depuis un terminal
 * @see https://www.devglan.com/online-tools/generate-self-signed-cert
 * Pour la commande ssl suivez les instructions ci-dessous
 *    mkdir certifs
 *    openssl genrsa -out certifs/private.pem 2048
 *    openssl req -new -key certifs/private.pem -out certifs/server.csr
 *    Répondez aux questions de la commande suivante ou laissez tout par défaut
 *        ici en dev la véracité des infos nous importe peu
 *        par contre en production, il faudra récupérer le vrai certificat associé au nom de domaine du site en production généré par letsencrypt ou un outil similaire
 *    openssl x509 -req -days 90 -in certifs/server.csr -signkey certifs/private.pem -out certifs/certificate.crt
*/
const options = {
  key: readFileSync(privateFilename),
  cert: readFileSync(certificateFilename)
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
