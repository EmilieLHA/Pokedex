# Pokedex

## Partie HTML / CSS

Mon fichier Html se découpe en 3 parties:
- le formulaire de recherche
- le loader (un border spinner de Bootstrap)
- la liste des pokemons affichée en flex-box et wrap auto
Ces 3 élements sont stylisés via Bootstrap.
Grace à Bootsrap ma feuille de style est totalement vierge mais ma structure est reponsive et reste assez esthétique.

## Partie JS

### Appel des API

Il s'agit d'un appel à une API Pokemon disponible gratuitement.
Le nombre de Pokemons disponible en ligne est très important, j'ai fait le chois de limiter mon appel aux 300 premiers afin de ne pas trop ralentir la page. Ce nombre est défini en début de code et en requete en template littéral dans l'url appellée.

J'ai choisi de passer par la méthode fetch suivi d'un double then. Au delà du fait que la méthode est plus récente qu'une requête XHR, je la trouve vraiment plus claire et lisbile.

On commence donc par récupérer la base de données. L'API retourne un array de 300 éléments, des pokemons, dont on va pouvoir utiliser les données.
Pour chaque élement, on va donc créer une 'fiche' sous la forme d'un objet 'donneeDetailPokemon' qui contiendra tous ce qu'on souhaite afficher en card sur la page.


Pour classer les pokemons par id croissant, j'utilise la **méthode sort** sur l'id de chaque objet. 
J'affiche uniquement les 20 premiers pokemons grace à slice(0,20) afin de pouvoir créer un scroll infini.

### Création des cartes
Il s'agit d'une simple création / ajout d'éléments au DOM. Les cartes étant formatées via Bootsrap, j'ajoute un certain nombre de classes.

### Scroll infini
Les dimensions de la page sont définies grâce à du destructuring, de l'affectation par décomposition. L'objet document présente un certain nombre de propriétés, je veux scrollTop, scrollHeight et clientHeight.
Lorsqu'on arrive en bas de la liste (jai ajusté à 10px car parfois le scroll se bloquait), on appelle la fonction ajouter des cartes et on étend l'affichage de Pokemons de 20 éléments.

### Fonction de recherche
Il est important de noter que quand on travaille sur des caractères, l'unicode est case sensitive. J'ai donc à chaque fois converti le texte en Uppercase.
Une chaîne de caractère est nativement assortie de propriétés qui ressemblent aux méthodes des Arrays. On peut donc faire la recherche d'un caractère spécifique en utilisant la propriété indexOf. Si elle retourne -1, le caractère n'est pas présent dans la chaîne et on peut masquer la carte.

