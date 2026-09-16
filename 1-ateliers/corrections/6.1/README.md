# Installation

## Docker

1. [cf. indications mise en place serveur MongoDB](../../6.1.md)
2. Copiez/collez *.env.example* et le renommer en *.env*
3. Lancez la commande suivante :
```bash
npm run start
```

---

## Sources

<!-- AUTO-GENERATED -->

### 1-ateliers/corrections/6.1

#### `1-ateliers/corrections/6.1/app.mjs`

```javascript
import express from 'express'
import indexRouter from './routes/index.mjs'
import  teamsRouter from './routes/teams.mjs'
const app = express();
app.use(express.json())
app.use('/', indexRouter);
app.use('/teams', teamsRouter);

export default app

```

#### `1-ateliers/corrections/6.1/controllers/index-controller.mjs`

```javascript
export const getDocumentation = (_, res) => {
  const { PORT } = process.env;
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
  res.json({ routes: documentation, version: "2.0.0" });
};
```

#### `1-ateliers/corrections/6.1/controllers/team-controller.mjs`

```javascript
import TeamRepository from "../models/repositories/team-repository.mjs";
import TeamModel from "../models/schemas/team-model.mjs";
import { connect } from "../models/connect.mjs";
await connect();
const repo = new TeamRepository(TeamModel);

export const findAll = async (_, res) => {
  repo
    .findAll()
    .then((teams) => {
      res.status(200).json(teams);
    })
    .catch(() => {
      res.status(500).json({ success: false, message: "Can't get teams" });
    });
};

export const findOne = (req, res) => {
  const { name } = req.params;
  if (/\d+/.test(name)) {
    res
      .status(400)
      .json({ message: `${name} must be a string`, success: false });
    return;
  }
  repo
    .findOne(name)
    .then((team) => {
      if (team && team._id) {
        res.status(200).json(team);
      } else {
        res
          .status(404)
          .json({ message: team.message ?? "Team not found", success: false });
      }
    })
    .catch(() => {
      res.status(500).json({
        success: false,
        message: `Internal server error`,
      });
    });
};

export const save = async (req, res) => {
  let team = req.team;
  const data = await repo.save(team);
  if (data._id)
    res.status(201).json({ message: "Team created", success: true, team });
  else {
    res.status(500).json({
      message:
        "Failed to insert new team, try again or contact-us please +33612345678",
      success: false,
    });
  }
};

```

#### `1-ateliers/corrections/6.1/index.mjs`

```javascript
import app from './app.mjs'

const PORT = process.env.PORT || 6100
app.listen(PORT, () => {
  console.info(`API on http://localhost:${PORT}`)
})
```

#### `1-ateliers/corrections/6.1/middlewares/check-team.mjs`

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

#### `1-ateliers/corrections/6.1/models/connect.mjs`

```javascript
import { mongoose } from "mongoose";
import { loadEnv } from "../utils/load-env.mjs";
export async function connect() {
  loadEnv()
  const state = mongoose.connection.readyState;
  if (state != 1) { // not connected
    const { MONGO_ROOT_USERNAME, MONGO_ROOT_PASSWORD, MONGO_DB_PORT, MONGO_DB_NAME } = process.env
    const cluster = `localhost:${MONGO_DB_PORT}/${MONGO_DB_NAME}?authSource=admin`
    const dbServer = `mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@${cluster}`
    return mongoose
      .connect(dbServer)
      .then(() => {
        console.info('connected OK')
        return mongoose.connection.readyState
      }) // 0 => disconnected, 1 => connected, 2 => Connecting, 3 => disconnecting
      .catch((err) => console.error("DB KO", err));
  }

  return state;
}
```

#### `1-ateliers/corrections/6.1/models/repositories/team-repository.mjs`

```javascript
export default class TeamRepository {
  constructor(model) {
    this.model = model
  }

  async save(team) {
    return this.model.create(team)
    .catch((err) => console.error('Error insert new team', err))
  }

  async findAll() {
    return this.model.find()
    .then((results) =>{
      return results
    })
    .catch(err => console.error('[ERROR:repository:findAll()]', err))
  }

  async findOne(name) {
    return this.model.find({ name })
    .then((results) => {
      if(results && results.length === 1) return results
      return { message : `Team ${name} does not exist` }
    })
    .catch(err => {
      console.error('[ERROR:repository:findOne()]', err)
      return err.message
    })
  }
}
```

#### `1-ateliers/corrections/6.1/models/schemas/game-model.mjs`

```javascript
import { Schema, model } from "mongoose";

const gameModel = Schema({
  home: { type: String, required: true },
  away: { type: String, required: true },
  score: { type: String, required: true },
  at: { type: Date, required: true },
});
export default model("Game", gameModel);

```

#### `1-ateliers/corrections/6.1/models/schemas/player-model.mjs`

```javascript
import { Schema, model } from "mongoose";

const playerModel = Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  number: { type: Number, required: true, unique: true },
});
export default model("Player", playerModel);

```

#### `1-ateliers/corrections/6.1/models/schemas/team-model.mjs`

```javascript
import { Schema, model } from "mongoose";

const teamModel = Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
});
export default model("Team", teamModel);

```

#### `1-ateliers/corrections/6.1/package.json`

```json
{
  "name": "6.1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "npm i && npm update && node index.mjs",
    "dev:w": "node --watch index.mjs",
    "start": "node index.mjs"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "express": "^5.2.1",
    "mongoose": "^9.3.1"
  }
}
```

#### `1-ateliers/corrections/6.1/routes/games.mjs`

```javascript
/**
 * Si vous n'avez pas réussi cet exercice
 * Faites la correction pour les matchs par vous-même
 * en vous appuyant sur la correction sur les équipes (teams)
 */
```

#### `1-ateliers/corrections/6.1/routes/index.mjs`

```javascript
import express from "express";
const indexRouter = express.Router();
import { getDocumentation } from "../controllers/index-controller.mjs";
indexRouter.get("/", getDocumentation);
export default indexRouter;

```

#### `1-ateliers/corrections/6.1/routes/teams.mjs`

```javascript
import express from "express";
import checkTeam from "../middlewares/check-team.mjs";
import { findAll, findOne, save } from "../controllers/team-controller.mjs";
const teamsRouter = express.Router();

teamsRouter.get("/", findAll);
teamsRouter.get("/:name", findOne);
teamsRouter.post("/", checkTeam, save);
export default teamsRouter;

```

#### `1-ateliers/corrections/6.1/utils/load-env.mjs`

```javascript
import {  fileURLToPath } from 'node:url'
import { resolve, dirname } from "node:path";

export function loadEnv() {
  const envFile = resolve(dirname(fileURLToPath(import.meta.url)), '..', '.env')
  process.loadEnvFile(envFile)
}
```

<!-- END AUTO-GENERATED -->