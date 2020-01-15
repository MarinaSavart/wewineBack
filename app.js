// impotr express
const express = require('express');
//import app
const app = express();
// imoprt bodyParser pour decoder le Json
const bodyParser = require('body-parser');

// import ROUTE
const userRoutes = require("./api/routes/user");
const cellarRoute = require("./api/routes/cellars");
const bottlesRoute = require('./api/routes/bottles');
const loginRoute = require('./api/routes/login');
const registerRoute = require('./api/routes/register');

app.use("/user", userRoutes);
app.use("/cellar", cellarRoute);
app.use("/bottles", bottlesRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);

// export app
module.exports = app;

