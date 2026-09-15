var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productRouter = require('./routes/product')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev')); // middleware journalisation (log)
app.use(express.json()); // middleware qui transforme le body au format JSON en objet JS ie JSON.parse(body)
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // parser les en-têtes HTTP pour récupérer les infos plus facile via JS
app.use(express.static(path.join(__dirname, 'public'))); // dossier public = dossier statique /images/logo.svg

app.use('/', indexRouter); 
app.use('/users', usersRouter); // Les routes commençant par /users (racine des routes /users) seront traitées par le router usersRouter
app.use('/product', productRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
