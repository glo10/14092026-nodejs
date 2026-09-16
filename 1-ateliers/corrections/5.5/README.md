# Correction atelier 5.5 : moteur de template avec pug

## Lancement du projet

PS : le projet a été initilisé au départ avec la commande `express --view=pug 5.5`.

1. `npm install`
2. `npm run start`
3. Copiez et renommez `.env.example` en `.env`

## Optimisation

A titre d'exercice, vous pouvez factoriser le code similaire notamment au niveau du controleur afin d'éviter la duplication du code.

---

## Sources

<!-- AUTO-GENERATED -->

### 1-ateliers/corrections/5.5

#### `1-ateliers/corrections/5.5/app.js`

```javascript
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index-router.cjs');
const userRouter = require('./routes/user-router.cjs')
const app = express();

// La ligne suivante rend le dossier public static => tout ce qu'il 
// y a dans le dossier public sera accessible depuis / donc /data /images /javascripts
app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev')); // middleware pour les logs
app.use(express.json()); // middleware qui transforme le body de la requête en JSON
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRouter);
app.use('/users', userRouter); // idem ce router gère toutes les routes qui matchent avec /users
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

```

#### `1-ateliers/corrections/5.5/controllers/user-controller.cjs`

```javascript
const { formatUser } = require("../public/javascripts/functions.cjs");
async function fetchData(url = "https://api.github.com/users") {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    return console.error("Error", err);
  }
}

function findAll(_, res) {
  fetchData()
    .then((items) => {
      const title = "Utilisateurs GitHub";
      items = items.map((user) => formatUser(user));
      res.status(200).render("templates/list", { items, title });
    })
    .catch(() => {
      res
        .status(500)
        .render("error", {
          message: "Erreur lors de la récupération des utilisateurs",
        });
    });
}

function findOne(req, res) {
  fetchData(`https://api.github.com/users/${req.params.login}`)
    .then((user) => {
      const title = `Utilisateur ${user.name}`;
      user = formatUser(user);
      res.status(200).render("templates/single", { item: user, title, isSingle: true });
    })
    .catch(() => {
      res
        .status(500)
        .render("error", {
          message: `Erreur lors de la récupération de l'utilisateur`,
        });
    });
}

module.exports = {
  findAll,
  findOne,
};

```

#### `1-ateliers/corrections/5.5/middlewares/user-middleware.cjs`

```javascript
const checkID = (req, res, next) => {
  const id = req.params.id;
  if (Number.isInteger(id)) {
    next();
  } else {
    res.render("error", { message: "L'id doit être un entier positif > 0" });
  }
}

const checkLogin = (req, res, next) => {
  if (/.+/.test(req.params.login)) next();
  else res.render("error", { message: "Message personnalisé" });
}

module.exports = {
  checkLogin
}
```

#### `1-ateliers/corrections/5.5/package.json`

```json
{
  "name": "5.5",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "npm i & npm update & node ./bin/www",
    "dev": "SET DEBUG=5.5-pug:* & node --watch ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "^4.4.3",
    "express": "^5.2.1",
    "http-errors": "^2.0.1",
    "morgan": "^1.10.1",
    "pug": "2.0.0-beta11"
  },
  "type": "commonjs"
}

```

#### `1-ateliers/corrections/5.5/public/javascripts/functions.cjs`

```javascript
const formatUser = (user) => {
  user.title = user.login;
  user.cover = user.avatar_url;
  user.link_details = `/users/${user.login}`;
  user.link = user.url;
  return user;
};

module.exports = {
  formatUser
};

```

#### `1-ateliers/corrections/5.5/public/stylesheets/style.css`

```css
body {
  padding: 50px;
  padding-bottom: 0;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
}

nav {
  display: flex;
  justify-content: flex-end;
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  top: 0;
  z-index: 1;
  background-color: #fff;
}

nav a {
  font-size: 1.15rem;
}

a {
  color: #00b7ff;
  margin: 1rem;
  display: block;
  cursor: pointer;
}

a svg {
  color: red;
}

h1 {
  font-size: 1.65rem;
}

h2 {
  font-size: 1.05rem;
  text-transform: capitalize;
}

main {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  align-items: end;
  margin-bottom: 3rem;
}

.box-single {
  grid-template-columns: 25% 1fr 25%;
}

.box-single .card {
  grid-column-start: 2;
}

main img {
  border-radius: 0.5rem;
  min-width: 250px;
  max-width: 50%;
  aspect-ratio:  1/1;
  box-sizing: content-box;
}

article {
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
}

.card footer {
  display: flex;
}

body>footer {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #fff;
}

```

#### `1-ateliers/corrections/5.5/routes/index-router.cjs`

```javascript
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Atelier 5.5' });
});

module.exports = router;

```

#### `1-ateliers/corrections/5.5/routes/user-router.cjs`

```javascript
const express = require("express");
const router = express.Router();
const { findAll, findOne } = require("../controllers/user-controller.cjs");
const { checkLogin } = require("../middlewares/user-middleware.cjs");
router.param("login", checkLogin);
router.get("/", findAll);
router.get("/:login", findOne);

module.exports = router;

```

<!-- END AUTO-GENERATED -->
