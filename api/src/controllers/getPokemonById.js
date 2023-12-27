const axios = require("axios");
const { URL_BASE } = require ("../helpers/urlHelpers")
const { Pokemons } = require ("../db")
const { formatPokemonFromApi, formatPokemonFromDB } = require("../handlers/pokemonHandlers");
const { v4: uuidv4 } = require("uuid")

const getPokemonById = async (req, res) => {
    try {
        const { id } = req.params;

        const responseApi = await axios.get(`${URL_BASE}/${(id)}`);
        const foundInApi = formatPokemonFromApi(responseApi.data);

        const validUUID = uuidv4(id)

        const responseDb = await Pokemons.findByPk(validUUID);
        const foundInDb = responseDb ? formatPokemonFromDB(responseDb) : null;

        if (foundInApi.id) {
            res.json(foundInApi);
        } else if (foundInDb) {
            res.json(foundInDb);
        } else {
            res.status(400).json({error:"Pokemon not found"});
        }
    } catch (error) {
        console.error("Error fetching Pokemon:", error)
        res.status(500).json({error: error.message})
    }
};

module.exports = getPokemonById;