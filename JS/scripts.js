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
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        // add event listener to button
        button.addEventListener("click", function(event) {
            showDetails(pokemon);
            console.log('hello', pokemon)
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
    })
    .then(function (details) {
      console.log(details)
      //add the details to the item
      item.imageUrlFront = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
      item.abilities = details.abilities;
      return item;
    }).catch(function (e) {
      console.error(e);
    });
  }
  
function showDetails(pokemon) {
    loadDetails(pokemon).then(function (pokemonData) {
    let modalContainer = document.querySelector
        ('#modal-container');
        showModal(pokemonData);
        

       function hideModal() {
        modalContainer.classList.remove('is-visible');
    }
    
    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal('Modal title', 'This is the modal content!');
        
    });
    //pokemon modal
    function showModal(pokemon) {
        
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');
        
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = "Close";
        closeButtonElement.addEventListener('click', hideModal);
        
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;
        
        let contentElement = document.createElement('p');
        contentElement.innertext = 'content goes here';

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    //hide modal
 

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
        }
    });
    
    
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
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