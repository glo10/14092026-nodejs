# Correction atelier 5.4 : authentification

## Installation et lancement

PS: ici tous les fichiers js ont l'extension .cjs à la place du classique .js
1. Générez un ***SECRET***, depuis un terminal, vous pouvez exécuter la commande ci-dessous
```js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
2. Copiez/collez *.env.example* et renommez le en *.env*
3. Affectez la valeur affiché dans la commande précédente dans `SECRET=`
4.`npm start`

---

## Sources

<!-- AUTO-GENERATED -->

### 1-ateliers/corrections/5.4

#### `1-ateliers/corrections/5.4/app.cjs`

```javascript
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index.cjs')
const usersRouter = require('./routes/users.cjs')

const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

```

#### `1-ateliers/corrections/5.4/classes/encryption.cjs`

```javascript
class Encryption {
  constructor(bcrypt, jwt, secret) {
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.secret = secret;
  }

  hash(plainPassword, saltRound = 10) {
    return this.bcrypt
      .hash(plainPassword, saltRound)
      .then((passwordHash) => passwordHash)
      .catch(() => {
        throw new Error("Impossible to hash password");
      });
  }

  comparePassword(plain, hash) {
    return new Promise((resolve, reject) => {
      return this.bcrypt.compare(plain, hash, (error, res) => {
        if (!error && res) resolve({ ok: res });
        reject("Email or password incorrect");
      });
    });
  }

  generateToken(user, duration = "2h") {
    return this.jwt.sign(
      {
        email: user.email,
      },
      this.secret,
      {
        expiresIn: duration,
      },
    );
  }
}
module.exports = Encryption;

```

#### `1-ateliers/corrections/5.4/classes/registration.cjs`

```javascript
class Registration {
  constructor(repository, encryption) {
    this.repository = repository
    this.encryption = encryption
  }

  login() {
    const { user } = this.repository

    if (!(user.email && user.password)) {
      return { message: 'email or password incorrect' }
    }
    return this.repository
    .findAll()
    .then((users) => {
      return this.repository.findOne(users)
    })
    .catch((error) => `error users route ${error.message}`)
    .then((userStored) => {
      return this.encryption.comparePassword(user.password, userStored.password)
    })
    .then((result) => {
      if (result.ok) {
        const token = this.encryption.generateToken(user)
        return { email: user.email, token, message : 'success'}
      }
      throw new Error('password or email incorrect')
    })
    .catch(error => error)
  }

  subscribe() {
    const { user } = this.repository
    if (user && user.email && user.password) {
      const hash = this.encryption.hash(user.password)
      return hash
        .then((passwordHash) => {
          user.setPassword(passwordHash)
          return user
        })
        .catch((error) => {
          throw new Error(error.message)
        })
        .then(() => this.repository.insert())
        .then((response) => {
          if (response.message === "success") {
            return response
          }
          throw new Error(response.message)
        })
        .catch(error => error)
    }
    throw new Error('email and password required')
  }
}
module.exports = Registration
```

#### `1-ateliers/corrections/5.4/controllers/user-controller.cjs`

```javascript

const Encryption = require('../classes/encryption.cjs')
const Registration = require('../classes/registration.cjs')
const UserRepository = require('../repositories/user-repository.cjs')
const { resolve } = require('node:path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../entities/user-entity.cjs')

function sign(req, res) {
  const registration = makeRegistration(req.body)
  const isLoginPath = req.url.toLowerCase().endsWith('sign-in')
  const userAction = isLoginPath ? registration.login() : registration.subscribe()
  const status = isLoginPath ? 200 : 201
  userAction
    .then( (response) => {
      const { message } = response
      if(message === 'success') res.status(status).json(response)
      else throw new Error(response)
    })
    .catch(error => {
      res.status(500).json(error.message)
    })
}

function makeRegistration(data) {
  if(!data) {
    throw new Error('email and password required')
  }
  const encryption = new Encryption(bcrypt, jwt, process.env.SECRET)
  const filename = resolve(__dirname, '..', 'data', 'users.json')
  const user = new User(data.email, data.password)
  const userRepository = new UserRepository(user, filename)
  return new Registration(userRepository, encryption)
}


module.exports = {
  sign
}

```

#### `1-ateliers/corrections/5.4/data/users.json`

```json
[
  {
    "email": "john@doe.com",
    "password": "$2b$10$B9CdkHd.stYd7odvdnabouGwgmHDJFpHwwNBpyJVtN7ryMhFu1dwO"
  }
]
```

#### `1-ateliers/corrections/5.4/entities/user-entity.cjs`

```javascript
class User {
  constructor(email, password) {
    this.email = email
    this.password = password
  }

  getEmail() {
    return this.email
  }

  getPassword() {
    return this.password
  }

  setEmail(email) {
    this.email = email
  }

  setPassword(password) {
    this.password = password
  }
}

module.exports = User
```

#### `1-ateliers/corrections/5.4/package.json`

```json
{
  "name": "5.4",
  "version": "0.1.0",
  "private": true,
  "type": "commonjs",
  "scripts": {
    "start": "node --watch ./bin/www"
  },
  "dependencies": {
    "bcrypt": "^6.0.0",
    "cookie-parser": "^1.4.4",
    "debug": "^4.4.3",
    "express": "^5.1.0",
    "http-errors": "^2.0.1",
    "jsonwebtoken": "^9.0.3",
    "morgan": "^1.10.1",
    "pug": "^3.0.4"
  }
}

```

#### `1-ateliers/corrections/5.4/public/stylesheets/style.css`

```css
body {
  padding: 50px;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
}

a {
  color: #00B7FF;
}

```

#### `1-ateliers/corrections/5.4/repositories/user-repository.cjs`

```javascript
const { readFile, writeFile } = require('node:fs/promises')

class UserRepository {
  constructor(user, filename) {
    this.user = user
    this.filename = filename
  }
  
  async insert() {
    if (!(this.user.email && this.user.password)) {
      throw new Error('Email and password are required')
    }
    return this.findAll()
    .then((users) => {
      if (this.findOne(users)) {
        return { message: 'Impossible to create a new account for the moment' }
      } else {
        users.push(this.user)
        return this.rewrite(users, this.filename)
      }
    })
    .catch(error => error)
  }

  findOne(users) {
    if (users) {
      return users.find((u) => u.email === this.user.email)
    }
    return null
  }

  async findAll() {
    // idéalement ici vérifier que le fichier existe et qu'il est vide plutôt
    const usersReader = readFile(this.filename, { encoding: 'utf8' })
    return usersReader
      .then((users) => JSON.parse(users))
      .catch((err) => {
        if(err.message.match(/unexpected.+JSON.+/i)) {
          return []
        }
        throw new Error(err.message)
      })
  }

  async rewrite(users) {
    return writeFile(this.filename, JSON.stringify(users))
      .then(() => { message: 'success' })
      .catch(error => error )
  }
}
module.exports = UserRepository

```

#### `1-ateliers/corrections/5.4/routes/index.cjs`

```javascript
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Correction atelier 5.4' });
});

module.exports = router;

```

#### `1-ateliers/corrections/5.4/routes/users.cjs`

```javascript
const express = require('express')
const router = express.Router()

const { sign } = require('../controllers/user-controller.cjs')
/**
 * Idéalement ici au lieu d'avoir une seule méthode sign()
 *  il faudrait avoir 2 méthodes différentes par ex signIn() et signUp()
 *  pour distinguer les 2 actions au niveau du controleur
 *  malgré le fait que le traitement est similaire
 */
router.post('/sign-up', sign)
router.post('/sign-in', sign)

module.exports = router

```

<!-- END AUTO-GENERATED -->