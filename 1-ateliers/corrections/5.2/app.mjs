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
