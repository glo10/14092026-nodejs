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