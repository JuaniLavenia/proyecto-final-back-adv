require('dotenv').config();
const express = require('express');
const logger = require('././loggers/logger');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => logger.info('mongoose conectado'))
    .catch((err) =>
        logger.error('No se pudo conectar con la base de datos', err)
    );

const morgan = require('morgan');
const winston = require('winston');
const paymentRoutes = require('./routes/payment.routes');

app.use(morgan('combined', { stream: winston.stream }));

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());
app.use(paymentRoutes);

const cors = require('cors');

app.get('/', (req, res) => {
    res.send('Bienvenido');
});

app.use(cors());
app.use('/api', require('./routes/auth.routes'));
app.use('/api', require('./routes/user.routes'));
app.use('/api', require('./routes/situation.routes'));
app.use(express.static(path.resolve('src/public')));


module.exports = {
    app,
};
