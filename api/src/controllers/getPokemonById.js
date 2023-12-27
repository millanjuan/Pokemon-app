const axios = require("axios");
const { URL_BASE } = require ("../helpers/urlHelpers")
const { Pokemons, Type } = require ("../db")
const { formatPokemonFromApi, formatPokemonFromDB } = require("../handlers/pokemonHandlers");

const getPokemonById = async (req, res) => {
    const { id } = req.params;
    try {
        const responseDb = await Pokemons.findOne({
            where: {id: id},
            include: { model: Type},
        });

        let result;
        if(responseDb.length !==0) {
            result = formatPokemonFromDB(responseDb)
            return res.status(200).json(result);
        } else {
            try {
                const responseApi = await axios.get(`${URL_BASE}/${(id)}`);
                result = formatPokemonFromApi(responseApi.data);
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
        console.error("Error fetching Pokemon:", error.message)
        res.status(500).json({error: error.message})
    }
};

module.exports = getPokemonById;