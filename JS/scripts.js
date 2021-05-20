// blank array for Pokemon data
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


// for loop
// for (let i=0; i < pokemonList.length; i++){
  //  if(pokemonList[i].height >= 2){
    //    document.write(pokemonList[i].name + " (" + "height " + pokemonList[i].height + ") " + "- Wow thats big! <br />");
    //}else{
      //  document.write(pokemonList[i].name + " (" + "height " + pokemonList[i].height + ") <br />");
    //}
//}
//pokemonList.forEach(function(name, height, type) {
  //  document.write(pokemonList.name + " (" + "height " + pokemonList.height + ") <br />");
//});
function myLoopFunction(pokemon) {
    document.write(pokemon.name + " (" + "height " + pokemon.height + ") <br />");
}
pokemonList.forEach(myLoopFunction);
