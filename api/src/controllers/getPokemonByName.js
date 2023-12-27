const axios = require("axios");
const { URL_BASE } = require("../helpers/urlHelpers");
const { Pokemons, Type } = require("../db");
const { formatPokemonFromApi, formatPokemonFromDB } = require("../handlers/pokemonHandlers");

const getPokemonByName = async (req, res) => {
  const { name } = req.query;
  console.log(name)

  try {
    const pokemonFromDb = await Pokemons.findOne({
      where: { name: name },
      include: { model: Type },
    });

    let result;
    if (pokemonFromDb) {
      result = formatPokemonFromDB(pokemonFromDb);
      return res.status(200).json(result);
    } else {
      try {
        const pokemonFromApi = await axios.get(`${URL_BASE}/${name.toLowerCase()}`);

        result = formatPokemonFromApi(pokemonFromApi.data);
        return res.status(200).json(result);
      } catch (error) {
        res.status(400).json({error: error.message})
      }
    }
  } catch (error) {
    console.error('Error fetching Pokemons:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPokemonByName;