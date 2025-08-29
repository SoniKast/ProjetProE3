require('dotenv').config();
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();
var multer = require("multer");
var logger = require('morgan');
var db = require("./models");
var cors = require('cors')
var path = require('path');
var fs = require("fs");

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

app.use(cors({
  origin: ['http://localhost:8080', 'http://0.0.0.0:8080'], // Allow both localhost and container access
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// IMPORTANT : gérer les requêtes préflight OPTIONS
app.options('*', cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Test database connection
    await db.sequelize.authenticate();
    res.status(200).json({ status: 'OK', database: 'connected' });
  } catch (error) {
    res.status(503).json({ status: 'ERROR', database: 'disconnected', error: error.message });
  }
});

app.use('/', indexRouter);
app.use('/api', evenementsRouter,
  inscriptionsRouter, newsRouter, administrateursRouter, authRouter);

const uploadDir = path.join(__dirname, "../front-end/public/event/header");

// Configuration de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dest = uploadDir
        fs.mkdirSync(dest, { recursive: true });
        cb(null, dest);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); 
    }
});

const upload = multer({ storage });

// Route pour uploader une image
app.use('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Fichier manquant' });
  res.json({ filename: req.file.filename, path: `/uploads/${req.file.filename}` });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Database sync with basic error handling
db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch(error => {
    console.error('Database synchronization failed:', error.message);
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
