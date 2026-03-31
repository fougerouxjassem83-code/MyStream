// On importe le module Express
const express = require('express');

// On crée l'application Express
const app = express();

// On importe mysql2 pour se connecter à la base de données MySQL
const mysql = require('mysql2');

// ================================
// MIDDLEWARES
// ================================

// Permet de lire les données envoyées par les formulaires (req.body)
app.use(express.urlencoded({ extended: false }));

// Permet de lire les données envoyées en JSON
app.use(express.json());

// Permet de servir les fichiers statiques (CSS, images, JS) depuis le dossier "public"
app.use(express.static('public'));

// On indique à Express où se trouvent les vues EJS
app.set('views', './views');

// On indique qu'on utilise EJS comme moteur de vues
app.set('view engine', 'ejs');

// ================================
// CONNEXION BASE DE DONNÉES
// ================================

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Thevie@976',
    database: 'mystream'
});

connection.connect((err) => {
    if (err) {
        console.log('Erreur de connexion :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL !');
});

// =====================================================
//  JE VAIS CREER MES ROUTES POUR PASSER DANS MES VUES
// =====================================================

app.get('/accueil', (req, res) => {
    console.log("je passe dans l'acceuil");
    res.render('acceuil');
});

app.get('/equipe', (req, res) => {
    res.render('equipe');
});

app.get('/inscription', (req, res) => {
    res.render('inscription');
});

app.get('/connection', (req, res) => {
    res.render('connection');
});

app.get('/abonnement', (req, res) => {
    res.render('abonnement');
});








// ✅ toujours à la fin
module.exports = app;
