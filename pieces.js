import { ajoutListenersAvis, ajoutListenerEnvoyerAvis } from "./avis.js";
// Récupération des pièces depuis le fichier JSON



const reponse = await fetch("http://localhost:8081/pieces/");
const pieces = await reponse.json();
ajoutListenerEnvoyerAvis();

//fonction pour generer les pieces : 
function genererPieces(pieces) {
    for (let i = 0; i < pieces.length; i++) {

        const article = pieces[i];

        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
        //Code ajouté
        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");
        // On rattache la balise article a la section Fiches
        sectionFiches.appendChild(pieceElement);
        // On rattache l’image à pieceElement (la balise article)
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        //Ajout des éléments au DOM pour l'exercice
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
        //Code aJouté
        pieceElement.appendChild(avisBouton);


    }
    // Ajout de la fonction ajoutListenersAvis
    ajoutListenersAvis();
}
// Premier affichage de la page
genererPieces(pieces);

//gestion des bouttons 
const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

//Correction Exercice
const boutonDecroissant = document.querySelector(".btn-decroissant");

boutonDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix;
    });
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);

});

const boutonNoDescription = document.querySelector(".btn-nodesc");

boutonNoDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description
    });
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const noms = pieces.map(piece => piece.nom);
for (let i = pieces.length - 1; i > 0; i--) {
    if (pieces[i].prix > 35) {
        noms.splice(i, 1);
    }
}

//création de la liste 
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste 
for (let i = 0; i < noms.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerHTML = noms[i];
    abordablesElements.appendChild(nomElement);
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables').appendChild(abordablesElements);
//pieces disponibles:
const nomsdisponibles = pieces.map(piece => piece.nom);
const prixdisponibles = pieces.map(piece => piece.prix);
for (let i = pieces.length - 1; i > 0; i--) {
    if (!pieces[i].disponibilite) {
        nomsdisponibles.splice(i, 1);
        prixdisponibles.splice(i, 1);
    }
}

//création de la liste 
const disponiblesElements = document.createElement('ul');
//Ajout de chaque nom à la liste 
for (let i = 0; i < noms.length; i++) {
    const nomElement = document.createElement('li');

    nomElement.innerHTML = `${nomsdisponibles[i]} - ${prixdisponibles[i]} €`;

    disponiblesElements.appendChild(nomElement);
}

// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.disponibles').appendChild(disponiblesElements);
const inputPrixMax = document.querySelector('#prix-max');
inputPrixMax.addEventListener('input', function () {
    console.log("je suis ici");
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= inputPrixMax.value;
    });
    console.log(piecesFiltrees);
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});
