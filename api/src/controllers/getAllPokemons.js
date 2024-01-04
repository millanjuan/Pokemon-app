const axios = require("axios");
const { Pokemons, Type } = require("../db");
const { URL_BASE } = require("../helpers/urlHelpers");
const { formatPokemonFromApi, formatPokemonFromDB } = require("../handlers/pokemonHandlers");
const capitalizeFirstLetter = require("../utils/capitalizeFirstLetter")

const getAllPokemons = async (req, res) => {
  try {
    const apiResponse = await axios.get(`${URL_BASE}/?limit=100`);
    const apiResults = apiResponse.data.results;

    const pokemonDB = await Pokemons.findAll({
      include: [{ model: Type, as: 'types', attributes: ['name'] }],
    });

    const apiList = await Promise.all(
      apiResults.map(async(apiPokemon) => {
        const pokemonResponse = await axios(apiPokemon.url);
        const infoFromApi = pokemonResponse.data;

        const formattedPokemon = formatPokemonFromApi(infoFromApi);

        return formattedPokemon;
      })
    );

    const dbList = pokemonDB.map((dbPokemon) => formatPokemonFromDB(dbPokemon));
    
    const allPokemons = [...apiList, ...dbList];
    res.status(200).json(allPokemons);
  } catch (error) {
    console.error('Error fetching Pokémons:', error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getAllPokemons;