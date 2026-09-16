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
