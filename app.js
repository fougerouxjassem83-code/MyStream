// On importe le module Express
const express = require('express');

// On crée l'application Express
const app = express();

// ICI je declare une variable pour importer mysql2 pour se connecter à la base de données MySQL
const mysql = require('mysql2');

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
// ICI JE CRÉE LA CONNEXION À MA BASE DE DONNÉES
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
// ICI JE COMMENCE A CREER MES ROUTES POUR PASSER DANS MES VUES
// =====================================================

app.get('/inscription', (req, res) => {
    res.render('inscription');
});

// J'affiche la page de connexion sans message d'erreur
app.get('/connection', (req, res) => {
    res.render('connection', { erreur: null });
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

// J'affiche la page abonnement avec les offres depuis ma base de données
app.get('/abonnement', (req, res) => {

    // Je récupère tous les abonnements depuis ma table abonnement
    connection.query('SELECT * FROM abonnement', (err, abonnements) => {
        if (err) {
            console.log('Erreur lors de la récupération des abonnements :', err);
            return;
        }
        // J'envoie les abonnements à ma vue abonnement.ejs
        res.render('abonnement', { abonnements: abonnements });
    });
});

// J'affiche la page equipe avec les membres depuis ma base de données
app.get('/equipe', (req, res) => {

    // Je récupère tous les membres depuis ma table equipe
    connection.query('SELECT * FROM equipe', (err, equipe) => {
        if (err) {
            console.log('Erreur lors de la récupération de l equipe :', err);
            return;
        }
        // J'envoie les membres à ma vue equipe.ejs
        res.render('equipe', { equipe: equipe });
    });
});

/*====================================================================*/
/* ICI JE VAIS CREER MA ROUTE POST POUR L'INSCRIPTION
/*====================================================================*/

// Je récupère les données du formulaire et je les insère dans ma table client
app.post('/inscription', (req, res) => {

    // Je récupère les données envoyées par le formulaire
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const age = req.body.age;
    const telephone = req.body.telephone;
    const email = req.body.email;
    const adresse = req.body.adresse;
    const mot_de_passe = req.body.mot_de_passe;

    // J'insère les données dans ma table client
    connection.query(
        'INSERT INTO client (nom, prenom, age, telephone, email, adresse, mot_de_passe) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nom, prenom, age, telephone, email, adresse, mot_de_passe],
        (err) => {
            if (err) {
                console.log('Erreur lors de l inscription :', err);
                return;
            }
            // Je redirige vers la page de l'acceuil après l'inscription
            res.redirect('/accueil');
        }
    );
});

/*====================================================================*/
/* ICI JE VAIS CREER MA ROUTE POST POUR LA CONNEXION
/*====================================================================*/

// Je vérifie les identifiants du client
app.post('/connection', (req, res) => {

    // Je récupère les données envoyées par le formulaire
    const email = req.body.email;
    const mot_de_passe = req.body.mot_de_passe;

    // Je cherche le client dans ma table client
    connection.query(
        'SELECT * FROM client WHERE email = ? AND mot_de_passe = ?',
        [email, mot_de_passe],
        (err, resultats) => {
            if (err) {
                console.log('Erreur lors de la connexion :', err);
                return;
            }

            // Si je trouve un client avec cet email et mot de passe
            if (resultats.length > 0) {
                // Je redirige vers la page d'accueil
                res.redirect('/accueil');
            } else {
                // Je renvoie la page avec un message d'erreur
                res.render('connection', { erreur: 'Email ou mot de passe incorrect !' });
            }
        }
    );
});

// toujours à la fin
module.exports = app;
























