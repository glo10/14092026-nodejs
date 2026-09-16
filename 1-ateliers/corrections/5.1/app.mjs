import express from 'express'

import indexRouter from './routes/index.mjs'
import  teamsRouter from './routes/teams.mjs'

const app = express();
app.use('/', indexRouter);
app.use('/teams', teamsRouter);

export default app
