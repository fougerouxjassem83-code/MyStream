/////////////////////////////////////////////////////////////////////////////////
//** ici je vais coder mon serveur de mon premier Projet seul */
/////////////////////////////////////////////////////////////////////////////////

// j'importe le module http
const http = require('http');

// j'importe l'application express app.js
const app = require('./app');

// je crée le serveur
const serveur = http.createServer(app);

// je déclare le port
const numPort = 1976;
console.log("numero de mon port :", numPort);

// ✅ CORRECTION ICI — app.set() prend 2 arguments : un nom et une valeur
app.set('port', numPort);

// je démarre le serveur
serveur.listen(numPort, () => {
    console.log("le serveur tourne sur le port :", numPort);
});