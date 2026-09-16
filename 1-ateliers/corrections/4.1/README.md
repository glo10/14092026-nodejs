# Correction atelier 4.1 : Express

L'arborescence d'un projet créé avec ***Express CLI*** peut-être encombrant (beaucoup de dossiers qui ne sont peut-être pas utiles à votre projet) dans certains cas.

Si vous voulez utiliser le Framework tout en ayant le contrôle sur l'organisation des dossiers, alors, il est préférable de partir d'un projet vierge ou déjà existant en ajoutant Express en tant que dépendance locale avec une installation via `npm i express` à la place d'utiliser la commande avec le CLI `express --no-view myapp`. 

PS : par défaut *Express* utilise le standard **Commonjs***, rien ne vous empêche d'utiliser le standard *ECMASCRIPT* à la place.

## Lancement

- `npm run dev`

---

## Sources

<!-- AUTO-GENERATED -->

### 1-ateliers/corrections/4.1

#### `1-ateliers/corrections/4.1/package.json`

```json
{
  "name": "4.1",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.mjs",
    "dev": "npm i && npm update & node src/index.mjs",
    "watch": "npm i && npm update & node --watch src/index.mjs"
  },
  "type": "module",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "express": "^5.2.1"
  }
}

```

#### `1-ateliers/corrections/4.1/public/css/main.css`

```css
body {
  background-color: lightblue;
}
```

#### `1-ateliers/corrections/4.1/public/html/404.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404</title>
</head>
<body>
  <h1>Oups 404</h1>
</body>
</html>
```

#### `1-ateliers/corrections/4.1/public/html/index.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Connexion</title>
  <link rel="stylesheet" href="/css/main.css">
</head>
<body>
  <h1>Connexion</h1>
</body>
</html>
```

#### `1-ateliers/corrections/4.1/public/html/news.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/css/main.css">
  <title>Actualités</title>
</head>
<body>
  <h1>Actualités</h1>
  <img src="/img/loop.png" alt="event loop image">
</body>
</html>
```

#### `1-ateliers/corrections/4.1/public/html/sign-up.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/css/main.css">
  <title>Inscription</title>
</head>
<body>
  <h1>Inscription</h1>
</body>
</html>
```

#### `1-ateliers/corrections/4.1/src/app.mjs`

```javascript
import express  from 'express'
import { 
  renderHomePage,
  renderSignUp,
  renderNews
} from './controllers/index-controller.js'
import { publicDir } from './utils/folders.mjs'
const app = express()
// Routes static sur le dossier public = tous les fichiers dans public/* seront accessibles depuis /
app.use(express.static(publicDir))
app.get('/', renderHomePage)
app.get('/sign-up', renderSignUp)
app.get('/news', renderNews)
export default app
```

#### `1-ateliers/corrections/4.1/src/controllers/index-controller.js`

```javascript
import { ReadStream, readFile } from "fs";
import { readFile as readFilePromise } from "node:fs/promises";
import { homepage } from "../utils/folders.mjs";
const render = (res, content) => {
  res.setHeader("Content-Type", "text/html").send(content);
};

const renderError = (res, error) => {
  res.status(500).send(error.message);
};

export const renderHomePage = (_, res) => {
  res.setHeader("Content-Type", "text/html");
  // ReadStream pour les fichiers volumineux ou envoyer dès que possible du contenu au client
  const rs = new ReadStream(homepage);
  rs.pipe(res);
  rs.on("error", (error) => {
    renderError(res, error);
  });
};

export const renderSignUp = (_, res) => {
  // readFile pour les très petits fichiers
  readFile(homepage.replace("index", "sign-up"), (error, content) => {
    if (error) {
      renderError(res, error);
      return;
    }
    render(res, content);
  });
};

export const renderNews = (_, res) => {
  // readFile version promesse pour les très pétits fichiers et une gestion avec les promesses
  readFilePromise(homepage.replace("index", "news"))
    .then((html) => render(res, html))
    .catch((error) => renderError(res, error));
};

```

#### `1-ateliers/corrections/4.1/src/index.mjs`

```javascript
import app from './app.mjs'
const PORT = process.env.PORT || 4100

app.listen(PORT, () => {
  console.log(`Listen on http://localhost:${PORT}`)
})
```

#### `1-ateliers/corrections/4.1/src/utils/folders.mjs`

```javascript
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

export const publicDir = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
  'public'
)
export const homepage = join(publicDir, 'html', 'index.html')
```

<!-- END AUTO-GENERATED -->