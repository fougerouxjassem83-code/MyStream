// On importe le module Express
const express = require('express');

// On crée l'application Express
const app = express();

// On importe mysql2 pour se connecter à la base de données MySQL
const mysql = require('mysql2');

// ================================
// MIDDLEWARES
// ================================

// Je lis les données envoyées par les formulaires
app.use(express.urlencoded({ extended: false }));

// Je lis les données envoyées en JSON
app.use(express.json());

// Je sers les fichiers statiques depuis le dossier "public"
app.use(express.static('public'));

// J'indique à Express où se trouvent mes vues EJS
app.set('views', './views');

// J'indique qu'on utilise EJS comme moteur de vues
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
// JE CRÉE MES ROUTES POUR PASSER DANS MES VUES
// =====================================================

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




// Je récupère tous les films et animés depuis la table contenu
app.get('/accueil', (req, res) => {
    console.log("je passe dans l'acceuil");

    // Je récupère tous les contenus depuis ma table contenu
    connection.query('SELECT * FROM contenu', (err, contenus) => {
        if (err) {
            console.log('Erreur lors de la récupération des contenus :', err);
            return;
        }
        // J'envoie les contenus à ma vue acceuil.ejs
        res.render('acceuil', { contenus: contenus });
    });
});



// ✅ toujours à la fin
module.exports = app;