const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const nunjucks = require('nunjucks');
const cors = require("cors");

const destinationsRouter = require('./controllers/destinations');
const destinationsApiRouter = require('./controllers/destinations.api');
const usersApiRouter = require('./controllers/users.api');

// DOTENV: Obtiene variables de entorno del archivo .env
require('dotenv').config();

var app = express();

// NUNJUCKS: configuración de motor de templates (view engine)
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
});
app.set('view engine', 'njk');

// CORS: nos ayuda a aceptar peticiones desde otros servidores ya que de lo contrario el servidor las bloqueará por defecto
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// SASS: configuración de sass middleware
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/destinations', destinationsRouter);
app.use('/api/v1/destinations', destinationsApiRouter);
app.use('/api/v1/users', usersApiRouter);

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
  if (err.status == 404) {
    res.send('404');
  } else {
    res.render('error');
  }
});

module.exports = app;
