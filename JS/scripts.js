// blank array for Pokemon data
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
        button.addEventListener("click", function(event) {
            showDetails(pokemon);
          });
}

function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }
  
function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
    console.log(pokemon);
});
}


return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function() {
// for loop
let pokemonInfo = pokemonRepository.getAll();

pokemonInfo.forEach (function(pokemon) {
    pokemonRepository.addListItem(pokemon);
    });
});