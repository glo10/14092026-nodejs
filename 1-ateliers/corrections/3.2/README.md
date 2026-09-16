# Correction Atelier 3.2 : serveur Web avec les fichiers Web (HTML, CSS et images)

## Warning

Les solutions présentés ici ont été volontairement complexifiées à titre pédagogique pour montrer l'utilisation de *promify* et *pipeline* qui permettent de synchroniser un flux de lecture (lecture fichier *HTML*) avec un d'écriture (réponse du serveur). Le code peut être amélioré avec une factorisation pour éliminer les répétitions.
Une solution d'un de vos camarades compact est disponible depuis [src/intern.js](./src/intern.js)

## Lancement du projet

Il faut d'abord générer les certificats SSL au préalable à partir des options proposés dans l'[énoncé](../../3.2.md).
Par exemple, en exécutant le script suivant depuis la racine du projet
```bash
node auto-generate-ssl.js
```

```bash
# combine l'installation et le lancement des programmes (standard et bonus)
npm run dev:all
```

## Certificat SSL

- Mise en place d'un certificat SSL [cf. l'un des solutions proposées dans le sujet](../../3.2.md)

---

## Sources

<!-- AUTO-GENERATED -->

### 1-ateliers/corrections/3.2

#### `1-ateliers/corrections/3.2/auto-generate-ssl.js`

```javascript
import { exec } from 'node:child_process'
// Attention à exécuter à la racine du projet : node auto-generate-ssl.js et créer au préalable le dossier config/ car la résolution des chémins n'a pas été effectué dans ce programme
// Génère une clé privée et un certificat auto-signé valable 90 jours
const command = 'openssl req -x509 -newkey rsa:2048 -keyout config/server-3.2.pem -out config/server-3.2.crt -days 90 -nodes -subj "/CN=localhost"';

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erreur : ${error.message}`);
    return;
  }
  console.log('stdout', stdout, 'stderr', stderr)
  console.log('Certificat et clé générés avec succès !');
});
```

#### `1-ateliers/corrections/3.2/eslint.config.js`

```javascript
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
]);

```

#### `1-ateliers/corrections/3.2/package.json`

```json
{
  "name": "3.2",
  "version": "1.0.0",
  "description": "Workshop Web HTTPS server with HTML",
  "main": "src/app.js",
  "scripts": {
    "start": "npm i & npm update & node src/app.js",
    "bonus": "npm i & npm update & node src/app-bonus.js",
    "dev": "npm i & npm update & node --watch src/app.js",
    "bonus:dev": "npm i & npm update & node --watch src/app-bonus.js",
    "start:all": "concurrently -n server,bonus -c blue,green \"npm run start\" \"npm run bonus\"",
    "dev:all": "concurrently -n server,bonus -c blue,green \"npm run dev\" \"npm run bonus:dev\""
  },
  "keywords": [],
  "author": "Glodie Tshimini",
  "license": "ISC",
  "type": "module",
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "concurrently": "^10.0.5",
    "eslint": "^10.10.0",
    "globals": "^17.12.0"
  }
}

```

#### `1-ateliers/corrections/3.2/public/css/main.css`

```css
body {
  background-color: lightgreen;
}

h1, p {
  text-align: center;
}

img {
  display: block;
  margin: auto;
}
```

#### `1-ateliers/corrections/3.2/public/html-bonus/404.html`

```html
<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/main.css">
  <title>Oups 404</title>
</head>

<body>
  <h1>Oups, mauvaise requête</h1>
</body>

</html>
```

#### `1-ateliers/corrections/3.2/public/html-bonus/index.html`

```html
<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenue formation Node JS</title>
  <link rel="stylesheet" href="/main.css">
</head>

<body>
  <h1>Formation Node JS avec Glodie</h1>
  <img src="/coding.jpg" alt="Coding image">
  <p>
    Photo de <a
      href="https://unsplash.com/fr/@synkevych?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Roman
      Synkevych</a> sur <a
      href="https://unsplash.com/fr/photos/smartphone-android-noir-vXInUOv1n84?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  </p>
</body>

</html>
```

#### `1-ateliers/corrections/3.2/public/html/404.html`

```html
<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Oups 404</title>
</head>

<body>
  <h1>Oups, mauvaise requête</h1>
</body>

</html>
```

#### `1-ateliers/corrections/3.2/public/html/index.html`

```html
<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenue formation Node JS</title>
</head>

<body>
  <h1>Formation Node JS avec Glodie</h1>
</body>

</html>
```

#### `1-ateliers/corrections/3.2/src/app-bonus.js`

```javascript
import { createServer } from "node:https";
import { join } from "node:path";
import { render } from "./utils/response.js";
import { options } from "./utils/ssl.js";
import { pagesBonusDir as pages, cssDir, imgDir } from "./utils/folders.js";
const PORT = 3243
const app = createServer(options, (req, res) => {
  const imgRgx = /.+\.(jpg|jpeg|png)$/; // les fichiers avec l'extension .jpg, .jpeg, ou .png
  const { url } = req;
  let type = { "Content-Type": "text/html" };
  let filename = "";
  if (req.method.toLowerCase() != "get") {
    res.statusCode = 405;
    res.end("Request Not Allowed");
  }
  if (url.endsWith("index.html") || url === "/") {
    filename = join(pages, "index.html");
  } else if (url.endsWith(".css")) {
    filename = join(cssDir, url);
    type = { "Content-Type": "text/css" };
  } else if (imgRgx.test(url)) {
    // La méthode match() retourne un tableau avec tous les morceaux qui match avec l'expression régulière
    const matches = url.match(imgRgx);
    // Récupération de l'extension à l'index 1, index 0 on a l'url de l'image
    const ext = matches[1];
    filename = join(imgDir, url);
    type = { "Content-Type": `image/${ext}` };
  } else if (/favicon\.ico/.test(url)) {
  /**
   * Le navigateur lorsqu'on rend du HTML
   *  par défaut effectue une requête supplémentaire pour charger le favicon.ico
   *  qui se trouve à la racine du site Web
   */
    return;
  }
  render(filename, res, type);
});

app.listen(PORT, () => {
  console.info(`Running on https://localhost:${PORT}`)
})

```

#### `1-ateliers/corrections/3.2/src/app.js`

```javascript
import { createServer } from "node:http";
import { info } from "node:console";
import { pagesDir as html } from "./utils/folders.js";
import { renderPromise } from "./utils/response.js";
const PORT = 3200;
createServer((req, res) => {
  const { url, method } = req;
  if (method === "GET" && url === "/") renderPromise(res, `${html}/index.html`);
  else renderPromise(res, `${html}/404.html`, 404);
}).listen(PORT, () => {
  info(`Listen on http://localhost:${PORT}`);
});

```

#### `1-ateliers/corrections/3.2/src/intern.js`

```javascript
import fs from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = "3200";

const htmlPath = path.resolve(__dirname, "src", "views");
const cssPath = path.resolve(__dirname, "src", "css");
const imagesPath = path.resolve(__dirname, "src", "img");

const server = createServer((req, res) => {
  const { url } = req;

  if (url === "/css/style.css") {
    const filePath = path.join(cssPath, "style.css");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/css; charset=utf-8");
    return fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        return res.end("Erreur interne du serveur");
      }
      res.end(data);
    });
  }

  if (url === "/img/images.jpg") {
    res.setHeader("Content-Type", "image/jpeg");
    return fs.readFile(path.join(imagesPath, "images.jpg"), (err, data) => {
      if (err) {
        res.statusCode = 404;
        return res.end("Image introuvable");
      }
      res.end(data);
    });
  }

  const defaultURL = url === "/" || url === "/index.html";

  const fileName = defaultURL ? "index.html" : "404.html";
  const filePath = path.join(htmlPath, fileName);

  res.statusCode = defaultURL ? 200 : 404;
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      return res.end("Erreur interne du serveur");
    }
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
  console.log(`Dossier des vues : ${htmlPath}`);
  console.log(`Dossier CSS      : ${cssPath}`);
  console.log(`Dossier images      : ${imagesPath}`);
});

```

#### `1-ateliers/corrections/3.2/src/utils/folders.js`

```javascript
import { fileURLToPath } from 'node:url';
import { resolve, join, dirname } from 'node:path';
export const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const publicDir = join(srcDir, '..', 'public');
export const pagesDir = join(publicDir, 'html'); 
export const pagesBonusDir = join(publicDir, 'html-bonus'); 
export const configDir = join(srcDir, '..', 'config');
export const cssDir = join(publicDir, 'css');
export const imgDir = join(publicDir, 'img');

```

#### `1-ateliers/corrections/3.2/src/utils/response.js`

```javascript
import { createReadStream, access, constants } from "node:fs";
import { join } from "node:path";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { error } from "node:console";
import { pagesDir, pagesBonusDir } from "./folders.js";
/**
 * Server response
 * @param {string} filename path to HTML file
 * @param {Object} res  object Response from node:https
 * @param {Object} headers objet HTTP headers
 */
export const render = (filename, res, headers = {}) => {
  const pg = /bonus\.mjs/.test(process.argv[1]) ? pagesBonusDir : pagesDir;
  const PAGE_404 = join(pg, "404.html");
  /**
   * access() permet de vérifier que le fichier existe et ses permissions
   */
  access(filename, constants.F_OK, (error) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/html" });
      // Connexion du stream de lecture (lecture page HTML) avec le stream d'écriture (objet Response de type stream.writable)
      createReadStream(PAGE_404).pipe(res);
    } else {
      res.writeHead(200, headers);
      createReadStream(filename).pipe(res);
    }
  });
};

export async function renderPromise(res, page, status = 200) {
  // Transformer l'implémentation de la callback de pipeline() en promesse
  const pipelinePromise = promisify(pipeline);
  res.writeHead(status, { "Content-Type": "text/html; charset=utf-8" });
  return pipelinePromise(createReadStream(page), res).catch((err) => {
    error(`Erreur sur la page ${page}:`, err);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Internal Server Error");
  });
}

```

#### `1-ateliers/corrections/3.2/src/utils/ssl.js`

```javascript
import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { configDir as dir } from './folders.js';
export const options = {
  key: readFileSync(resolve(dir, "server-3.2.pem")),
  cert: readFileSync(resolve(dir, "server-3.2.crt")),
  agent: false,
  path: "/",
};
```

<!-- END AUTO-GENERATED -->