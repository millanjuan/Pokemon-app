const { Pokemons, Type } = require("../db");

const postNewPokemon = async (req, res) => {
  try {

    const requiredFields = ['name', 'types', 'image', 'hp', 'defense', 'attack'];
    const missingFields = requiredFields.filter(field => !(field in req.body));

    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Please complete the required fields: ${missingFields.join(', ')}` });
    }

    const { name, types, image, hp, defense, attack, speed, height, weight } = req.body;

    const existingPokemon = await Pokemons.findOne({ where: { name } });
    if (existingPokemon) {
      return res.status(400).json({ error: 'A Pokémon with the same name already exists' });
    }

    const newPokemonInDb = await Pokemons.create({
      name,
      image,
      hp,
      defense,
      attack,
      speed,
      height,
      weight,
    });

    const existingTypes = await Type.findAll({ where: { name: types } });
    const existingTypeNames = existingTypes.map(type => type.name);

    const typesArray = Array.isArray(types) ? types : [types];

    const validTypes = typesArray.every(type => existingTypeNames.includes(type));

    if (!validTypes) {
      return res.status(400).json({ error: "Invalid types provided" });
    }

    await newPokemonInDb.setTypes(existingTypes);

    if (newPokemonInDb) {
        const pokemonTypes = await newPokemonInDb.getTypes();
      
        const responseData = {
          id: newPokemonInDb.id,
          name: newPokemonInDb.name,
          image: newPokemonInDb.image,
          hp: newPokemonInDb.hp,
          defense: newPokemonInDb.defense,
          attack: newPokemonInDb.attack,
          speed: newPokemonInDb.speed,
          height: newPokemonInDb.height,
          weight: newPokemonInDb.weight,
          createdAt: newPokemonInDb.createdAt,
          updatedAt: newPokemonInDb.updatedAt,
          types: pokemonTypes.map(type => type.name),
        };
      
        return res.status(201).json({ success: true, data: responseData });
      } else {
        return res.status(500).json({ error: "Failed to create a new Pokemon" });
      }
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ error: error.errors[0].message });
    }

    console.error("Failed to create a new Pokemon:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

module.exports = postNewPokemon;