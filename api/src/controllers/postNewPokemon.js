const { Pokemons, Type } = require("../db");

const postNewPokemon = async (req, res) => {
  try {
    const { name, types, img, hp, defense, attack, speed, height, weight } = req.body;

    //VALIDATIONS
    const requiredFields = ['name', 'types', 'img', 'hp', 'defense', 'attack'];
    const missingFields = requiredFields.filter(field => !(field in req.body));
    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Please complete the required fields: ${missingFields.join(', ')}` });
    }

    const existingPokemon = await Pokemons.findOne({ where: { name } });
    if (existingPokemon) {
      return res.status(400).json({ error: 'A Pokémon with the same name already exists' });
    }


    const typesArray = Array.isArray(types) ? types : [types];
    const typeIds = [];

    for (const typeName of typesArray) {
      const [type] = await Type.findOrCreate({ where: { name: typeName } });
      typeIds.push(type.id);
    }

    const newPokemonInDb = await Pokemons.create({
      name,
      img,
      hp,
      defense,
      attack,
      speed,
      height,
      weight,
    });

    await newPokemonInDb.setTypes(typeIds);

    if (newPokemonInDb) {
      const pokemonTypes = await newPokemonInDb.getTypes();

      const responseData = {
        id: newPokemonInDb.id,
        name: newPokemonInDb.name,
        img: newPokemonInDb.img,
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

      return res.status(200).json(responseData);
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