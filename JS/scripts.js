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
        pokemonList.push(pokemon);
        }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getall
    };
})();

pokemonRepository.getAll();
pokemonRepository.add({name: "Pikachu" });

// for loop

function myLoopFunction(pokemon) {
    document.write(pokemon.name + " (" + "height " + pokemon.height + ") <br />");
}
pokemonList.forEach(myLoopFunction);
