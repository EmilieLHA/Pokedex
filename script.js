let tousLesPokemons = [];
let tableauFinal = [];
let liste = document.querySelector(".listePokemon");
let nombreDePokemons = 300;
let champsDeRecherche = document.querySelector('#pokemon');
let iconeChargement = document.querySelector('.chargement');

// Couleurs des cartes par type de pokemon 
const types = {
    grass: '#78c850',
	ground: '#E2BF65',
	dragon: '#6F35FC',
	fire: '#F58271',
	electric: '#F7D02C',
	fairy: '#D685AD',
	poison: '#966DA3',
	bug: '#B3F594',
	water: '#6390F0',
	normal: '#D9D5D8',
	psychic: '#F95587',
	flying: '#A98FF3',
	fighting: '#C25956',
    rock: '#B6A136',
    ghost: '#735797',
    ice: '#96D9D6'
};


// Recupere les 300 premiers pokemons de la base 
function listerPokemons() {

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${nombreDePokemons}`)
        .then((reponse) => {
            return reponse.json()
        })
        .then((listePokemon) => {
            // console.log(listePokemon);
            listePokemon.results.forEach((pokemon) => {
                completerPokemon(pokemon);
            });
            });
};

listerPokemons();

// recupere les détails de chaque pokemon et les envoie l'un apres l'autre dans le tableau tousLesPokemons puis les classe par ID dans le TableauFinal, on limite l'affichage à 20 cartes
function completerPokemon(pokemon) {

    let donneeDetailPokemon = {};
    let urlDetailPokemon = pokemon.url;
    
    fetch(urlDetailPokemon).then((reponse) => {return reponse.json()}).then((data) => {
        donneeDetailPokemon.image = data.sprites.front_default;
        donneeDetailPokemon.type = data.types[0].type.name;
        let idPokemon = data.id;
        donneeDetailPokemon.id = idPokemon;

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${idPokemon}/`)
        .then((reponse) => { return reponse.json()})
        .then((speciesPokemon) => {
            donneeDetailPokemon.nomEnFrancais = speciesPokemon.names[4].name;
            tousLesPokemons.push(donneeDetailPokemon);

            if (tousLesPokemons.length === nombreDePokemons) {
                // console.log(tousLesPokemons);
                tableauFinal = tousLesPokemons.sort(function(a,b) {return a.id - b.id}).slice(0,20);
                // console.log(tableauFinal);
                creerLesCartes(tableauFinal);
                iconeChargement.style.display = "none";
            }
        })

})
}

function creerLesCartes(array) {

    for (let i = 0; i < array.length; i++) {
        
        let carte = document.createElement("li");
        carte.setAttribute("class", "list-group-item card m-1 p-4");
        carte.style.backgroundColor = types[array[i].type];


        let titre = document.createElement("h5");
        titre.setAttribute("class", "card-title");
        titre.innerText = array[i].nomEnFrancais;

        let image = document.createElement("img");
        image.setAttribute("class", "card-body");
        image.src = array[i].image;

        let id = document.createElement("p")
        id.setAttribute("class", "card-body");
        id.innerText = `ID#${array[i].id}`;

        liste.append(carte);
        carte.append(titre);
        carte.append(image);
        carte.append(id);

    }

}

// Scroll infini 

window.addEventListener('scroll', () => {
    // Desctrucuturing pour récupérer des infos de l'objet document 
    const {scrollTop , scrollHeight, clientHeight} = document.documentElement;
    console.log(index);
    if (scrollTop + clientHeight >= scrollHeight-10) {
        ajouterCartes(20);
    }
});


let index = 20;

function ajouterCartes(n) {
    if (index>= nombreDePokemons) {
        return;

    } else {
        
        let tableauPokemonAjouter = tousLesPokemons.slice(index,index+n);
        console.log(tableauPokemonAjouter);
        creerLesCartes(tableauPokemonAjouter);
        index+= n;

    }

}


// Fonction de recherche

champsDeRecherche.addEventListener('keyup', recherche);

function recherche() {
    if (index < nombreDePokemons) {
        ajouterCartes(nombreDePokemons-index);
    }

    let elementRecherche, toutesLesCartes, titreCarte, tousLesTitres;
    elementRecherche = champsDeRecherche.value.toUpperCase();
    toutesLesCartes = document.querySelectorAll("li");
    tousLesTitres = document.querySelectorAll('h5'); 

    for (let i = 0; i < tousLesTitres.length; i++) {
        titreCarte = tousLesTitres[i].innerText;
        if (titreCarte.toUpperCase().indexOf(elementRecherche)==-1) {
            toutesLesCartes[i].style.display = "none";
        } else {
            toutesLesCartes[i].style.display = "flex";
        }
    }


}