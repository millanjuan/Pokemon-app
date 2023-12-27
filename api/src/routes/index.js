const { Router } = require('express');

//CONTROLLERS
const getAllPokemons = require("../controllers/getAllPokemons");
const getPokemonById = require ("../controllers/getPokemonById");
const getPokemonByName = require("../controllers/getPokemonByName");
const getAllTypes = require("../controllers/getAllTypes");
const postNewPokemon = require("../controllers/postNewPokemon");


const router = Router();

//ROUTES
router.get("/pokemons", getAllPokemons);
router.get("/pokemons/name", getPokemonByName);
router.get("/pokemons/:id", getPokemonById);
router.get("/types", getAllTypes);

router.post("/pokemons", postNewPokemon);
module.exports = router;
