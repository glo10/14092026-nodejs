# Correction atelier 5.2 : middlewares

cf [README.md atelier 5.1](../5.1/)

---

## Sources

<!-- AUTO-GENERATED -->

### 1-ateliers/corrections/5.2

#### `1-ateliers/corrections/5.2/app.mjs`

```javascript
import express from 'express'

import indexRouter from './routes/index.mjs'
import  teamsRouter from './routes/teams.mjs'
import allowAccessControl from './middlewares/allow-access-control.mjs';
const app = express();
// Middleware qui définie tout ce qu'on autorise (les méthodes, les clients (navigateur, terminal, etc.))
app.use(allowAccessControl);
// Middleware qui transforme req.body en objet JS donc évite par la suite de faire un JSON.parse()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/teams', teamsRouter);

export default app

```

#### `1-ateliers/corrections/5.2/controllers/index-controller.mjs`

```javascript
loadEnvFile(); // charger les variables d'environnement dans .env
const { PORT } = process.env || 5200;

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
  res.json({ routes: documentation, version: "1.0.1" });
}
```

#### `1-ateliers/corrections/5.2/controllers/team-controller.mjs`

```javascript
import { filename } from "../utils.mjs/filename.mjs";
import { readFile, writeFile } from "node:fs/promises";
export const findAll = (_, res) => {
  readFile(filename)
    .then((content) => JSON.parse(content))
    .then(({ teams }) => {
      res.status(200).json(teams);
    })
    .catch(() =>
      res.status(500).json({ success: false, message: "Can't get teams" }),
    );
};

export const findOne = (req, res) => {
  const { id } = req.params;
  readFile(filename)
    .then((content) => JSON.parse(content))
    .then(({ teams }) => {
      const team = teams.find((t) => t.id === parseInt(id));
      if (team) {
        res.status(200).json(team);
      } else {
        res.status(404).json({ message: "Team not found", success: false });
      }
    })
    .catch(() =>
      res
        .status(500)
        .json({ success: false, message: `Can't get a team with ID ${id}` }),
    );
};

export const insertOne = async (req, res) => {
  const { team } = req;
  const data = await readFile(filename).then((content) => JSON.parse(content));
  team.id = data.teams.length + 1;
  data.teams.push(team);
  writeFile(filename, JSON.stringify(data))
    .then(() => {
      res.status(201).json({ message: "Team created", success: true, team });
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "Contact-us please +33612345678", success: false });
    });
};

```

#### `1-ateliers/corrections/5.2/data/teams.json`

```json
{"teams":[{"id":1,"name":"Real Madrid","country":"Spain"},{"id":2,"name":"Manchester City","country":"UK"},{"id":3,"name":"Paris Saint-Germain","country":"France"},{"id":4,"name":"Chelsea","country":"UK"},{"name":"Marseille","country":"France","id":5},{"name":"Toulouse","country":"France","id":6},{"name":"Lille","country":"France","id":7}],"games":[{"id":1,"home":1,"away":2,"score":"3-0","date":"2026-03-11"},{"id":2,"home":3,"away":4,"score":"5-2","date":"2025-03-11"}]}
```

#### `1-ateliers/corrections/5.2/index.mjs`

```javascript
import app from './app.mjs'

const PORT = process.env.PORT || 5200
app.listen(PORT, () => {
  console.info(`API on http://localhost:${PORT}`)
})
```

#### `1-ateliers/corrections/5.2/middlewares/allow-access-control.mjs`

```javascript
export default (_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  next();
}
```

#### `1-ateliers/corrections/5.2/middlewares/check-params.mjs`

```javascript
export default (req, res, next) => {
  const id = req.params.id;
  if (!/\d+/.test(id)) {
    res.status(400).send({ success: false, message: `${id} must be a number` });
  } else {
    next();
  }
}
```

#### `1-ateliers/corrections/5.2/middlewares/check-team.mjs`

```javascript
export default (req, res, next) => {
  const { name, country } = req.body
  if(name && country && typeof name === 'string' && typeof country === 'string' ){
    req.team = { name, country }
    next()
  } else {
    res.status(400).send({ success: false, message: `New team must have only name and country properties` });
  }
}
```

#### `1-ateliers/corrections/5.2/middlewares/check-unique-team.mjs`

```javascript
// TODO demander aux stagiaires de le faire
import { readFile } from 'node:fs/promises'
import { filename } from '../utils.mjs/filename.mjs';
export default async (req, res, next) => {
  const { teams } = await readFile(filename).then((content) => JSON.parse(content));
  const { team } = req
  const isExist = teams.find(t => t.name === team.name)
  if(!isExist){
    next()
  } else {
    res.status(400).json({ success: false, message: `${team.name} already exists` });
  }
}
```

#### `1-ateliers/corrections/5.2/package.json`

```json
{
  "name": "5.2",
  "version": "1.0.0",
  "description": "Champions league API with middlewares",
  "main": "index.mjs",
  "scripts": {
    "test": "vitest",
    "dev": "npm i && npm update && node index.mjs",
    "dev:w": "node --watch index.mjs",
    "start": "node index.mjs"
  },
  "keywords": [],
  "author": "Glodie Tshimini",
  "license": "ISC",
  "dependencies": {
    "express": "^5.1.0"
  },
  "devDependencies": {
    "supertest": "^7.1.4",
    "vitest": "^4.1.0"
  }
}

```

#### `1-ateliers/corrections/5.2/routes/games.mjs`

```javascript
/**
 * Si vous n'avez pas réussi cet exercice
 * Faites la correction pour les matchs par vous-même
 * en vous appuyant sur la correction sur les équipes (teams)
 */
```

#### `1-ateliers/corrections/5.2/routes/index.mjs`

```javascript
import express from "express";
import { loadEnvFile } from "node:process";
import { getDocumentation } from "../controllers/index-controller.mjs";
const indexRouter = express.Router();
indexRouter.get("/", getDocumentation);
export default indexRouter;

```

#### `1-ateliers/corrections/5.2/routes/teams.mjs`

```javascript
import express from "express";
import checkParams from "../middlewares/check-params.mjs";
import checkTeam from "../middlewares/check-team.mjs";
import checkUniqueTeam from "../middlewares/check-unique-team.mjs";
import { findAll, findOne, insertOne } from "../controllers/team-controller.mjs";
// Création de la route
const teamsRouter = express.Router();

teamsRouter.param("id", checkParams);
teamsRouter.get("/", findAll);

teamsRouter.get("/:id", findOne);

/** checkTeams 1er middleware,  checkUniqueTeam 2eme middleware, fonction anonyme qui vient est aussi un middleware */
teamsRouter.post("/", checkTeam, checkUniqueTeam, insertOne);
export default teamsRouter;

```

#### `1-ateliers/corrections/5.2/utils.mjs/filename.mjs`

```javascript
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
export const filename = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "data",
  "teams.json",
);
```

#### `1-ateliers/corrections/5.2/vitest.config.mjs`

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