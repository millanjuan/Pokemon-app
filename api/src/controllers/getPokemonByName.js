const axios = require("axios");
const { URL_BASE } = require("../helpers/urlHelpers");
const { Pokemons } = require ("../db");
const { formatPokemonFromApi, formatPokemonFromDB } = require("../handlers/pokemonHandlers");

const getPokemonByName = async (req, res) => {

    try {
        const {name} = req.query;

        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({error: "Invalid Name"});
        }

        const responseApi = await axios.get(`${URL_BASE}/${name}`);
        const foundInApi = formatPokemonFromApi(responseApi.data);

        const responseDb = await Pokemons.findOne({where: { name: name}});
        const foundInDb = responseDb ? formatPokemonFromDB(responseDb) : null;

        let result;



        if(foundInApi.name) {
            result = foundInApi;
        } else if (foundInDb) {
            result = foundInDb;
        } else {
            res.status(400).json({error:"Pokemon not found"})
        }

        res.json(result)
        
    } catch (error) {
        console.error("Error fetching Pokemons:", error)
        res.status(500).json({error:"Internal server error"})
    }
}

module.exports = getPokemonByName;