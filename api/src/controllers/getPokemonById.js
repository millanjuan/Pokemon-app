const axios = require("axios");
const { URL_BASE } = require ("../helpers/urlHelpers")
const { Pokemons, Type } = require ("../db")
const { formatPokemonFromApi, formatPokemonFromDB } = require("../handlers/pokemonHandlers");

const isUUID = (id) => {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  };
  
  const getPokemonById = async (req, res) => {
    const { id } = req.params;
  
    try {
      if (isUUID(id)) {
        const responseDb = await Pokemons.findByPk(id, {
          include: Type,
        });
  
        if (responseDb) {
          const result = formatPokemonFromDB(responseDb);
          return res.status(200).json(result);
        }
      }
  
      const responseApi = await axios.get(`${URL_BASE}/${id}`);
      const result = formatPokemonFromApi(responseApi.data);
      return res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching Pokemons:', error.message);
      return res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = getPokemonById;