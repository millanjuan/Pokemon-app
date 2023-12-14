const { Router } = require('express');

//CONTROLLERS
const getAllPokemons = require("../controllers/getAllPokemons");
const getPokemonById = require ("../controllers/getPokemonById");
const getPokemonByName = require("../controllers/getPokemonByName");
const getAllTypes = require("../controllers/getAllTypes");
const postNewPokemon = require("../controllers/postNewPokemon");


const router = Router();

//ROUTES
router.get("/pokemon", getAllPokemons);
router.get("/pokemon/:id", getPokemonById);
router.get("/pokemon/:name", getPokemonByName);
router.get("/types", getAllTypes);

router.post("/pokemon", postNewPokemon)
module.exports = router;
