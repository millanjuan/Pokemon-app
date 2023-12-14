const formatPokemonFromApi = (apiPokemon) => ({
    id: apiPokemon.id,
    name: apiPokemon.name,
    types: apiPokemon.types.map((t) => t.type.name),
    img: apiPokemon.sprites.other['official-artwork'].front_default,
    hp: apiPokemon.stats.find((stat) => stat.stat.name === 'hp').base_stat,
    attack: apiPokemon.stats.find((stat) => stat.stat.name === 'attack').base_stat,
    defense: apiPokemon.stats.find((stat) => stat.stat.name === 'defense').base_stat,
    speed: apiPokemon.stats.find((stat) => stat.stat.name === 'speed').base_stat,
    weight: apiPokemon.weight,
    height: apiPokemon.height,
});

const formatPokemonFromDB = (pokemonDB) => {
    
    if (!pokemonDB) {
        return null;
    } else return ({
        id: pokemonDB.id,
        name: pokemonDB.name,
        img: pokemonDB.img,
        hp: pokemonDB.hp,
        attack: pokemonDB.attack,
        defense: pokemonDB.defense,
        speed: pokemonDB.speed,
        weight: pokemonDB.weight,
        height: pokemonDB.height, 
    });
}


module.exports = {
    formatPokemonFromApi,
    formatPokemonFromDB,
};
