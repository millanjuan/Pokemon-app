const axios = require("axios");
const { Type } = require("../db");
const { URL_TYPE } = require("../helpers/urlHelpers");


const getAllTypes = async (req, res) => {

    try {
        const typesFromDb = await Type.findAll();

        if (typesFromDb.length === 0) {
            const apiTypesResponse = await axios.get(URL_TYPE);
            const apiTypesResults = apiTypesResponse.data.results.map((type) => type.name);
            await Type.bulkCreate(apiTypesResults.map((name) => ({name})));
        }

        const newTypesFromDb = await Type.findAll()

        res.status(200).json(newTypesFromDb);

        
    } catch (error) {
        console.error("Error fetching Pokémon types:", error);
        res.status(500).json({error: "Internal server error"});
    }
};

module.exports = getAllTypes;