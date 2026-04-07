
// J'ouvre la popup avec le trailer du contenu cliqué
function ouvrirPopup(trailerUrl) {
    document.getElementById('trailer').src = trailerUrl;
    document.getElementById('popup').style.display = 'flex';
}

// Je ferme la popup et j'arrête la vidéo
function fermerPopup() {
    document.getElementById('trailer').src = '';
    document.getElementById('popup').style.display = 'none';
}