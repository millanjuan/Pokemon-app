const axios = require("axios");
const { URL_BASE } = require("../helpers/urlHelpers");
const { Pokemons, Type } = require("../db");
const { formatPokemonFromApi, formatPokemonFromDB } = require("../handlers/pokemonHandlers");

const getPokemonByName = async (req, res) => {
  const { name } = req.params;

  try {
    const pokemonFromDb = await Pokemons.findOne({
      where: { name: name },
      include: { model: Type },
    });

    let result;

    if (pokemonFromDb.length !== 0) {
      result = formatPokemonFromDB(pokemonFromDb);
      return res.status(200).json(result);
    } else {
      try {
        const pokemonFromApi = await axios.get(`${URL_BASE}/${name.toLowerCase()}`);

        result = formatPokemonFromApi(pokemonFromApi.data);
        return res.status(200).json(result);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return res.status(404).json("Pokemon not found");
        }
        console.error('Error fetching Pokemons from API:', error.message);
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  } catch (error) {
    console.error('Error fetching Pokemons:', error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getPokemonByName;