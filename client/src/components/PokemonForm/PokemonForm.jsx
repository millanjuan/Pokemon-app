import axios from "axios";
import styles from "./PokemonForm.module.css";
import validation from "./validation";
import { useEffect, useState } from "react";
import pokeball from "../Image/pokeball.png"

const PokemonForm = () => {
  // LOCAL STATES
  const [pokemonData, setPokemonData] = useState({
    name: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    speed: null,
    height: null,
    weight: null,
    types: ["", ""],
  });
  const [errors, setErrors] = useState({});
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/types");
        setTypes(response.data);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };
    fetchTypes();
  }, []);

  // HANDLE FUNCTIONS
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setPokemonData({
      ...pokemonData,
      [name]: value.toLowerCase(),
    });
  
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  
  const handleTypeChange = (e) => {
    const { name, value } = e.target;
    if (name === "types1") {
      setPokemonData({
        ...pokemonData,
        types: [value, pokemonData.types[1]],
      });
    } else if (name === "types2") {
      setPokemonData({
        ...pokemonData,
        types: [pokemonData.types[0], value],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validation(pokemonData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:3001/pokemons",
          pokemonData
        );

        if (response.data.name) {
          window.alert("¡Pokemon successfully created!");
          setPokemonData({
            name: "",
            img: "",
            hp: "",
            attack: "",
            defense: "",
            speed: null,
            height: null,
            weight: null,
            types: ["", ""],
          });
        } else {
          console.error("Error creating Pokemon:", response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className={styles.formContainer}>

      <form  onSubmit={handleSubmit}>
        <img src={pokeball} alt="pokeball"/>
        <h2>CREATE A NEW POKEMON</h2>
        <div className={styles.fieldContainer}>
          <label className={styles.field}>
            <span>Name:</span>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={pokemonData.name}
              onChange={handleChange}
              className={errors.name && styles.error}
            />
            {errors.name && <span className={styles.errors}>{errors.name}</span>}
          </label>

          <label className={styles.field}>
            <span>Image:</span>
            <input
              type="text"
              name="img"
              placeholder="Image"
              value={pokemonData.img}
              onChange={handleChange}
              className={errors.img && styles.error}
            />
            {errors.img && <span className={styles.errors}>{errors.img}</span>}
          </label>

          {["hp", "attack", "defense", "speed", "height", "weight"].map((field) => (
            <div key={field} className={styles.field}>
              <label>
                <span>{field.charAt(0).toUpperCase() + field.slice(1)}:</span>
                <input
                  type="number"
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={pokemonData[field] || ""}
                  onChange={handleChange}
                  className={errors[field] && styles.error}
                />
                {errors[field] && <span className={styles.errors}>{errors[field]}</span>}
              </label>
            </div>
          ))}
        </div>


        <div className={styles.typesContainer}>
          <label>
            Type 1:
            <select
              name="types1"
              value={pokemonData.types[0]}
              onChange={handleTypeChange}
            >
              <option value="" disabled>
                Select Type 1
              </option>
              {types.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name.toUpperCase()}
                </option>
              ))}
            </select>
          </label>

          <label>
            Type 2:
            <select
              name="types2"
              value={pokemonData.types[1]}
              onChange={handleTypeChange}
            >
              <option value="" disabled>
                Select Type 2
              </option>
              {types.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name.toUpperCase()}
                </option>
              ))}
            </select>
          </label>
          {errors.types && (
          <span className={styles.errors}>{errors.types}</span>
        )}
        </div>



        <button className={styles.button} type="submit">CREATE</button>
      </form>
    </div>
  );
};

export default PokemonForm;