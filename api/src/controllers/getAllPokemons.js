const axios = require("axios");
const { Pokemons } = require("../db");
const { URL_BASE } = require("../helpers/urlHelpers");
const { formatPokemonFromApi, formatPokemonFromDB } = require("../handlers/pokemonHandlers");

const getAllPokemons = async (req,res) => {

    try {
        const apiResponse = await axios.get(`${URL_BASE}/?limit=100`)
        const apiResults = apiResponse.data.results;

        const pokemonDB = await Pokemons.findAll();

        const apiList = await Promise.all(
            apiResults.map(async(apiPokemon) => {
                const pokemonResponse = await axios(apiPokemon.url);
                const infoFromApi = pokemonResponse.data;

                return formatPokemonFromApi(infoFromApi)
            })
        );
        const dbList = pokemonDB.map((dbPokemon) => formatPokemonFromDB(dbPokemon))
        
        const allPokemons = [...apiList, ...dbList]
        res.status(200).json(allPokemons);
        
    } catch (error) {
        console.error('Error fetching Pokémons:', error);
        res.status(500).json({ error: "Internal server error" });
  }
    };





module.exports = getAllPokemons;