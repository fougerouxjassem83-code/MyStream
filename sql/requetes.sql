/*====================================================================*/
/*ici je vais mettre les requetes sql pour la base de données*/
/*====================================================================*/


-- ===========================
-- TABLE ABONNEMENT
-- ===========================
-- Cette table stocke les offres d'abonnement disponibles
-- sur la plateforme MyStream (Basic, Standard, Premium).

CREATE TABLE abonnement (
    id_abonnement INT PRIMARY KEY NOT NULL AUTO_INCREMENT,  -- identifiant unique
    titre VARCHAR(155) NOT NULL,                            -- nom de l'abonnement
    nombre_go INT NOT NULL                                  -- quantité de data incluse
);


-- ===========================
-- INSERTIONS ABONNEMENT
-- ===========================
-- Ici j'ajoute les offres pour tester ma table "abonnement".
INSERT INTO abonnement VALUES
(1, 'Basic', 5),
(2, 'Standard', 20),
(3, 'Premium', 50);


-- ===========================
-- TABLE CLIENT
-- ===========================
-- Cette table stocke les informations des clients
-- qui souscrivent à un abonnement MyStream.

CREATE TABLE client (
    id_client INT PRIMARY KEY NOT NULL AUTO_INCREMENT,  -- identifiant unique
    nom VARCHAR(155) NOT NULL,                          -- nom de famille
    prenom VARCHAR(155) NOT NULL,                       -- prénom
    age INT NOT NULL,                                   -- âge du client
    telephone VARCHAR(100) NOT NULL,                    -- numéro de téléphone
    email VARCHAR(155) NOT NULL,                        -- adresse email
    adresse VARCHAR(255) NOT NULL                       -- adresse postale
);


-- ===========================
-- INSERTIONS CLIENT
-- ===========================
-- Ici j'ajoute des clients pour tester ma table "client".

INSERT INTO client VALUES
(1, 'Dupont', 'Jean', 25, '0601010101', 'jean.dupont@gmail.com', 'Paris'),
(2, 'Martin', 'Sophie', 30, '0602020202', 'sophie.martin@gmail.com', 'Lyon'),
(3, 'Bernard', 'Lucas', 22, '0603030303', 'lucas.bernard@gmail.com', 'Marseille'),
(4, 'Leroy', 'Emma', 28, '0604040404', 'emma.leroy@gmail.com', 'Bordeaux'),
(5, 'Petit', 'Noah', 35, '0605050505', 'noah.petit@gmail.com', 'Toulouse');


-- ===========================
-- TABLE COMMERCIAL
-- ===========================
-- Cette table stocke les membres de l'équipe commerciale
-- qui se déplacent pour vendre les abonnements aux clients.

CREATE TABLE commercial (
    id_commercial INT PRIMARY KEY NOT NULL AUTO_INCREMENT,  -- identifiant unique
    nom VARCHAR(155) NOT NULL,                              -- nom de famille
    prenom VARCHAR(155) NOT NULL,                           -- prénom
    fonction VARCHAR(80) NOT NULL,                          -- poste (Manager, Agent...)
    email VARCHAR(155) NOT NULL,                            -- adresse email
    telephone VARCHAR(100) NOT NULL,                        -- numéro de téléphone
    numero_immatriculation VARCHAR(20) NOT NULL             -- plaque d'immatriculation du véhicule
);


-- ===========================
-- INSERTIONS COMMERCIAL
-- ===========================
-- Ici j'ajoute des commerciaux pour tester ma table "commercial".

INSERT INTO commercial VALUES
(1, 'Moreau', 'Alice', 'Manager', 'alice.moreau@mystream.com', '0611111111', 'AB-123-CD'),
(2, 'Durand', 'Paul', 'Agent', 'paul.durand@mystream.com', '0622222222', 'EF-456-GH'),
(3, 'Lefebvre', 'Marie', 'Agent', 'marie.lefebvre@mystream.com', '0633333333', 'IJ-789-KL');


-- ===========================
-- TABLE SOUSCRIPTION
-- ===========================
-- Cette table fait le lien entre un client et un abonnement.
-- C'est ici qu'on enregistre le contrat de chaque client.

CREATE TABLE souscription (
    id_souscription INT PRIMARY KEY NOT NULL AUTO_INCREMENT,  -- identifiant unique
    id_client INT NOT NULL,                                   -- client concerné
    id_abonnement INT NOT NULL,                               -- abonnement choisi
    date_souscription DATE NOT NULL,                          -- date de souscription
    FOREIGN KEY (id_client) REFERENCES client(id_client),
    FOREIGN KEY (id_abonnement) REFERENCES abonnement(id_abonnement)
);


-- ===========================
-- INSERTIONS SOUSCRIPTION
-- ===========================
-- Ici j'ajoute des souscriptions pour tester les relations
-- entre les tables client et abonnement.

INSERT INTO souscription VALUES
(1, 1, 2, '2024-01-15'),
(2, 2, 3, '2024-02-20'),
(3, 3, 1, '2024-03-10'),
(4, 4, 2, '2024-04-05'),
(5, 5, 3, '2024-05-18');


-- ===========================
-- TABLE CONTENU
-- ===========================
-- Cette table stocke les films et animés
-- disponibles sur la plateforme MyStream.

CREATE TABLE contenu (
    id_contenu INT PRIMARY KEY NOT NULL AUTO_INCREMENT,  -- identifiant unique
    titre VARCHAR(155) NOT NULL,                         -- titre du film ou animé
    type VARCHAR(50) NOT NULL,                           -- film ou animé
    genre VARCHAR(80) NOT NULL,                          -- genre (action, comédie...)
    annee_sortie INT NOT NULL                            -- année de sortie
);


-- ===========================
-- INSERTIONS CONTENU
-- ===========================
-- Ici j'ajoute des films et animés pour tester ma table "contenu".

INSERT INTO contenu VALUES
(1, 'Naruto', 'Animé', 'Action', 2002),
(2, 'One Piece', 'Animé', 'Aventure', 1999),
(3, 'Inception', 'Film', 'Science-Fiction', 2010),
(4, 'Intouchables', 'Film', 'Comédie', 2011),
(5, 'Dragon Ball Z', 'Animé', 'Action', 1989);