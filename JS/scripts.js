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

    return {
        add: add,
        getAll: getAll
    };
})();


// for loop
let pokemonInfo = pokemonRepository.getAll();

pokemonInfo.forEach (function(pokemon) {
    document.write(pokemon.name + " " + pokemon.type + " " + " (" + "height " + pokemon.height + ") <br />");
});