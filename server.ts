const express = require('express');
const path = require('path');
const app = express();
const homeRoutes = require('./routes/home');
const IDERoutes = require('./routes/IDE');
const loginRoutes = require('./routes/login');
const problemRoutes = require('./routes/problem');

import AppDataSource from './models/data-source'

// Resolve configurations
const config = require('./config/config.js');
const port = config.port;

// Create DB
AppDataSource.initialize()
    .then(() => {
        console.log("DB connection success");
    })
    .catch((error) => console.log(error))

// Serve static files (not sure if this will be necessary in the future?)
app.use(express.static(path.join(__dirname, 'controllers', 'static')));
app.use(express.static(path.join(__dirname, 'views', 'static')));


app.use('/', loginRoutes);
app.use('/home', homeRoutes);
app.use('/IDE', IDERoutes);
app.use(problemRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});