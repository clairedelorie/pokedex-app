// IIFE
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (typeof pokemon === 'object' &&
        'name' in pokemon &&
        'detailsUrl' in pokemon) {
            return pokemonList.push(pokemon);
        } else {
            document.write("Pokemon not found")
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
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemonModal');
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        // add event listener to button
        button.addEventListener("click", function() {
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

function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    })
    .then(function (details) {
      console.log(details)
      //add the details to the item
      pokemon.imageUrlFront = details.sprites.front_default;
      pokemon.imageUrlBack = details.sprites.back_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
      pokemon.weight = details.weight;
      pokemon.abilities = details.abilities;
    })
    .catch(function (e) {
      console.error(e);
    });
  }
  
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

    //pokemon modal
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalHeader = $('.modal-header');
    let modalTitle = $('.modal-title');
    

    // Empty modal content
    modalTitle.empty();
    modalBody.empty();
    modalHeader.empty();
    
    
    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    //let nameElement = document.createElement("h1");
    nameElement.innerText = pokemon.name;
    nameElement.classList.add("text-capitalize");
    
    let imagePokemon = $(
    '<img class="pokemon-image" height="200px" width="200px">'
    );
    imagePokemon.attr("src", pokemon.imageUrl);
    
    let heightElement = $("<p>" + "Height : " + pokemon.height + "</p>");
    let weightElement = $("<p>" + "Weight : " + pokemon.weight + "</p>");
    let typeElement = $("<p>" + "Type : " + pokemon.types + "</p>");
    let abilitiesElement = $('<p>' + 'Abilities : ' + item.abilities + '</p>');
    
    modalBody.append(nameElement);
    modalBody.append(imagePokemon);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeElement);
    modalBody.append(abilitiesElement);
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
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
