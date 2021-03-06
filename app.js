// import express
const express = require('express');
//import app
const app = express();
// import de la base de donnée
const mongoose = require('mongoose');
// import cors
const cors = require('cors');

// connection a la base de donnée
mongoose.connect('mongodb+srv://admin:' + process.env.MONGOO_ATLAS_PW + '@cluster0-e0vot.mongodb.net/test?retryWrites=true&w=majority',
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true ,
    useCreateIndex: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


// imoprt bodyParser pour decoder le Json
const bodyParser = require('body-parser');

// import de morgan
// mogan permet de log toute requete entrante
const morgan = require('morgan');

// utilisation des import
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());


// importdes fichiers routes pour creer des routes
const userRoutes = require("./api/routes/user");
const cellarRoute = require("./api/routes/cellars");
const bottlesRoute = require('./api/routes/bottles');

// instentiation des routes
app.use("/users", userRoutes);
app.use("/cellars", cellarRoute);
app.use("/bottles", bottlesRoute);


// message d'erreur 404
app.use((req, res, next) => {
    const error = new Error('404 Not found');
    error.status = 404;

    next(error);
});

// message d'erreur interne 500
app.use((error, req, res, next) => {

    res.status(error.status || 500);
    res.json({
        error: {message: error.message}
    })
});

// export app
module.exports = app;

