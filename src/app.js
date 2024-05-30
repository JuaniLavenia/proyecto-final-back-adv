require('dotenv').config();
const express = require('express');
const logger = require('././loggers/logger');
const app = express();
const session = require('express-session');
const passport = require('passport');
const {
  serializeUser,
  deserializeUser,
  githubStrategy,
  googleStrategy,
} = require('./middlewares/passport.middleware');
const paymentRoutes = require('./routes/payment.routes')

const NODE_ENV = process.env.NODE_ENV;

const connectionString =
  NODE_ENV === 'test' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI;
const path = require('path');

const mongoose = require('mongoose');
mongoose
  .connect(connectionString)
  .then(() => logger.info('mongoose conectado'))
  .catch((err) =>
    logger.error('No se pudo conectar con la base de datos', err)
  );

const morgan = require('morgan');

app.use(
  morgan(function (tokens, req, res) {
    const logMessage = {
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: tokens.status(req, res),
      rs: tokens['response-time'](req, res) + ' ms',
    };

    logger.info({
      message: JSON.stringify(logMessage),
      date: new Date().toLocaleString(),
    });
    return JSON.stringify(logMessage);
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET ?? '',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());
app.use(paymentRoutes);

app.use(passport.initialize());
app.use(passport.session());

passport.use(googleStrategy);
passport.use(githubStrategy);

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


const cors = require('cors');

app.get('/', (req, res) => {
    res.send('Bienvenido');
});


app.use(cors());
app.use('/api', require('./routes/auth.routes'));
app.use('/api', require('./routes/user.routes'));
app.use('/api', require('./routes/situation.routes'));
app.use('/api',require('./routes/payment.routes'));
app.use(express.static(path.resolve('src/public')));


module.exports = app;
