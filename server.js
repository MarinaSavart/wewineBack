// import la requete http
const http = require('http');
// import app
const app = require('./app');

// Creation du server
const serveur = http.createServer(app);
// Ecoute du serveur sur le port 8000
serveur.listen(8000);
