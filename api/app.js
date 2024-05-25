require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cors = require('./middlewares/cors.middleware');

require('./configs/db.config');

const app = express();

// Middlewares

app.use(logger('dev'));
app.use(express.json());
app.use(cors)

//Routes

app.use('/api', require('./configs/routes.config'));
app.use('/', require('./web'));

//Error handler

app.use((req, res, next) => {
    res.status(400).json({ message: 'Route not found' })
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({ message: 'Internal Server Error'})
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`App runnning at port ${port}`));