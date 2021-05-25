// blank array for Pokemon data
let pokemonRepository = (function () {
    let pokemonList = [
        {
        name: "Bulbasaur", 
        height: 0.7, 
        type: ["grass","poison"]
        },
        {
        name: "Ivysaur", 
        height: 1, 
        type: ["grass","poison"]
        },
        {
        name: "Venusaur", 
        height: 2, 
        type: ["grass","poison"]
        }
    ];

    function add(pokemon) {
        if (typeof pokemon === 'object') {
            return pokemonList.push(pokemon);
        } else {
            document.write("Please insert name of Pokemon")
        }
    }

    function getAll() {
        return pokemonList;
    }
   
    //function to create buttons for pokemon
function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
     let listPokemon = document.createElement('li');
     let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-style');
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        // add event listener to button
        button.addEventListener('click', function() {
            showDetails(pokemon);
          });
}

function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
		console.log(pokemon);
	});
}

return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
};
})();


// for loop
let pokemonInfo = pokemonRepository.getAll();

pokemonInfo.forEach (function(pokemon) {
    pokemonRepository.addListItem(pokemon);
    });
