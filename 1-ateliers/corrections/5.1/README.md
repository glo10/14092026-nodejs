# Correction atelier 5.1 : API REST

## Lancement du projet

Projet express avec l'utilisation du module *express* et le standard *ECMAScript*.
Express a été installé avec `npm i express` et pas la CLI

Copiez/collez le fichier [.env.example](./.env.example) et renommez-le en ***.env***

```bash
npm run dev
```

## Lancement des tests d'intégration avec supertest

```bash
npm run test
```

Ici pas besoin de lancer le serveur en parallèle, étant donné qu'on exporte ***app.mjs***, on peut l'utiliser autant de fois qu'on le souhaite notamment ici pour l'environnement de test.

---

## Sources

<!-- AUTO-GENERATED -->

### 1-ateliers/corrections/5.1

#### `1-ateliers/corrections/5.1/app.mjs`

```javascript
import express from 'express'

import indexRouter from './routes/index.mjs'
import  teamsRouter from './routes/teams.mjs'

const app = express();
app.use('/', indexRouter);
app.use('/teams', teamsRouter);

export default app

```

#### `1-ateliers/corrections/5.1/controllers/index-controller.mjs`

```javascript
process.loadEnvFile(); // charger les variables d'environnement dans .env
const { PORT } = process.env || 5100;
export const getDocumentation = (_, res) => {
  const documentation = [
    {
      route: "GET /teams",
      description: "Teams list",
      path: `http://localhost:${PORT}/teams`,
    },
    {
      route: " GET /teams/:id",
      description: "One team",
      schema: {
        id: "number",
      },
      path: `http://localhost:${PORT}/teams/1`,
    },
    {
      route: "POST /teams",
      description: "Add a new team",
      schema: {
        type: "application/json",
        body: {
          name: "string",
          country: "string",
        },
      },
    },
    //...
  ];
  res.json({ routes: documentation, version: "1.0.0" });
}
```

#### `1-ateliers/corrections/5.1/controllers/teams-controller.mjs`

```javascript
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const filename = resolve(dirname(fileURLToPath(import.meta.url)), "..", "data", "teams.json");

export const findAll = (_, res) => {
  readFile(filename)
    .then((content) => JSON.parse(content))
    .then(({ teams } ) => {
      res.status(200).json(teams);
    })
    .catch(() => res.status(500).json({ success: false, message: "Can't get teams"}));
}

export const findOne = (req, res) => {
  const { id } = req.params;
  readFile(filename)
    .then((content) => JSON.parse(content))
    .then(({ teams } ) => {
      const team = teams.find((t) => t.id === parseInt(id));
      if (team) {
        res.status(200).json(team);
      } else {
        res.status(404).json({ message: "Team not found", success: false });
      }
    })
    .catch(() => res.status(500).json({ success: false, message: `Can't get a team with ID ${id}`}))
}

export const insertOne = async (req, res) => {
  // Attention ici niveau sécurité c'est 0, le client peut envoyer n'importe quoi et ça passera
  let team = ''
  req.on('data', (chunk) => {
    team += chunk
  })
  req.on('end', async() =>  {
    team = JSON.parse(team) // transformer le JSON envoyé qui est un string en objet JS
    const data = await readFile(filename).then(content => JSON.parse(content))
    team.id = data.teams.length + 1
    data.teams.push(team)
    writeFile(filename, JSON.stringify(data))
    .then(() => {
      res.status(201).json({ message: 'Team created', success: true, team});
    }).catch(() => {
      res.status(500).json({ message: 'Contact-us please 0612345678', success: false})
    })
  })
}
```

#### `1-ateliers/corrections/5.1/data/teams.json`

```json
{
  "teams": [
    {
      "id": 1,
      "name": "Naples",
      "country": "Italy"
    },
    {
      "id": 2,
      "name": "Arsenal",
      "country": "UK"
    },
    {
      "id": 3,
      "name": "Paris Saint-Germain",
      "country": "France"
    },
    {
      "id": 4,
      "name": "ŠK Slovan Bratislava",
      "country": "Slovakia"
    }
  ],
  "games": [
    {
      "id": 1,
      "home": 1,
      "away": 2,
      "score": "0-1",
      "date": "2026-09-09"
    },
    {
      "id": 2,
      "home": 3,
      "away": 4,
      "score": "6-1",
      "date": "2026-09-09"
    }
  ]
}
```

#### `1-ateliers/corrections/5.1/index.mjs`

```javascript
import app from './app.mjs'

const PORT = 5100
app.listen(PORT, () => {
  console.info(`API on http://localhost:${PORT}`)
})
```

#### `1-ateliers/corrections/5.1/package.json`

```json
{
  "name": "5.1",
  "version": "1.0.0",
  "description": "Champions league API",
  "main": "index.mjs",
  "scripts": {
    "test": "vitest",
    "dev": "npm i && npm update && node index.mjs",
    "dev:w": "node --watch index.mjs",
    "start": "node index.mjs"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^5.2.1"
  },
  "devDependencies": {
    "supertest": "^7.2.2",
    "vitest": "^5.0.1"
  }
}

```

#### `1-ateliers/corrections/5.1/routes/games.mjs`

```javascript
/**
 * Si vous n'avez pas réussi cet exercice
 * Faites la correction pour les matchs par vous-même
 * en vous appuyant sur la correction sur les équipes (teams)
 */
```

#### `1-ateliers/corrections/5.1/routes/index.mjs`

```javascript
import express from "express";
import { getDocumentation } from "../controllers/index-controller.mjs";
const indexRouter = express.Router();
indexRouter.get("/", getDocumentation);
export default indexRouter;

```

#### `1-ateliers/corrections/5.1/routes/teams.mjs`

```javascript
import express from "express";
import { findAll, findOne, insertOne } from "../controllers/teams-controller.mjs";
// Création de la route
const teamsRouter = express.Router();
teamsRouter.get("/", findAll);

teamsRouter.get("/:id", findOne );

teamsRouter.post("/",  insertOne);
export default teamsRouter;

```

#### `1-ateliers/corrections/5.1/tests/app.test.mjs`

```javascript
import { describe, it } from 'vitest'
import request from 'supertest'
import app from '../app.mjs'

// describe() décrit une suite de tests
describe("Testing route GET /teams/:id", () => {
  // it() ou son alias test() effectue le test avec une assertion
  it.todo("Should have 404 when id is not numeric");
  it.todo("Should have 200 when id is numeric")
});

describe("Testing route GET /teams", () => {
  it("Should have status 200", () => {
    // AAA
    // Arrange = preparer l'environnement nécessaire pour tester
    // Act = appeler vos fonctions ou réaliser l'action à tester
    // Assert = vérifications (vérifier que le résultat obtenu = résultat attendu)
    return request(app) // Arrange
    .get('/teams') // Act 
    .expect(200) // Assert
  });
  it("Should have JSON data", () => {
    return request(app)
    .get('/teams')
    .expect('Content-Type', /json/)
  });

  it("Should have a collection(array) of teams", async () => {
    const response = await request(app)
      .get('/teams')
      expect(Array.isArray(response.body)).toBe(true)
  });
});

describe.todo("Testing route POST /teams");

```

#### `1-ateliers/corrections/5.1/vitest.config.mjs`

```javascript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 100,
    coverage: {
      reporter: ['html'],
      reportsDirectory: './tests/coverage'
    },
    exclude: [ 'node_modules']
  }
})

```

<!-- END AUTO-GENERATED -->