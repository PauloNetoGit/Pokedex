
function convertPokemonToLi(pokemon) {
  return `
  <li class="pokemon ${pokemon.type}">
    <span class="number">#${("000"+pokemon.number).slice(-3)}</span>
    <span class="namer">${pokemon.name}</span>

    <div class="detail">
      <ol class="type">
        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
      </ol>
      <img src="${pokemon.photo}"</img>
    </div>
  </li>
      `
    ;
}

var pokemonList;
document.addEventListener("DOMContentLoaded", function () {
  pokemonList = document.getElementById("pokemonList");
});

pokeApi.getPokemons().then((pokemons = []) => {
  pokemonList.innerHTML = pokemons.map(convertPokemonToLi).join("");
});
