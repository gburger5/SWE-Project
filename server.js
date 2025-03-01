const express = require('express');
const path = require('path');
const app = express();
const homeRoutes = require('./routes/home')
const IDERoutes = require('./routes/IDE')


// Resolve configurations
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.js');
const port = config.port;

// Serve static files (not sure if this will be necessary in the future?)
app.use(express.static(path.join(__dirname, 'controllers', 'static')))
app.use(express.static(path.join(__dirname, 'views', 'static')))

// Serve the homepage
app.use('/', homeRoutes)
app.use('/IDE', IDERoutes)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});