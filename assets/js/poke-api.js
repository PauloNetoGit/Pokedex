const pokeApi = {};

function converPokeApiDetailToPokemont(pokeDetail){
  const pokemon = new Pokemon()
  pokemon.number = pokeDetail.order
  pokemon.name = pokeDetail.name

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types

  pokemon.types = types
  pokemon.type = type

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

  return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
  .then((response) => response.json())
  .then(converPokeApiDetailToPokemont)
};

pokeApi.getPokemons = (offset = 0, limit = 100) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
      //peguei a lista de pokemons
      .then((response) => response.json())
      //converteu a lista de pokemons para JSON
      .then((jsonBody) => jsonBody.results)
      //Transformando a lista para pegar o detalhes dos pokemons
      .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
      //Promise.all - queremos que todas as requisições terminem
      .then((detailRequests) => Promise.all(detailRequests))
      //agora conseguimos obter uma lista de detalhes
      .then((pokemonsDetails) => pokemonsDetails)
};
