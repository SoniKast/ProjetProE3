require('dotenv').config();
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var express = require('express');
var logger = require('morgan');
var db = require("./models");
var cors = require('cors')
var path = require('path');
const port = 3000

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var evenementsRouter = require('./routes/evenements');
var inscriptionsRouter = require('./routes/inscriptions');
var newsRouter = require('./routes/news');
var administrateursRouter = require('./routes/administrateurs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', evenementsRouter, 
  inscriptionsRouter, newsRouter, administrateursRouter, authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

db.sequelize.sync({ force: false }).then(function () {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: 'Erreur',
    message: err.message,
    error: err
  });
});

module.exports = app;
