import axios from "axios"
import styles from "./PokemonForm.module.css";
import validation from "./validation";
import { useEffect, useState } from "react";


const PokemonForm = () => {

    //LOCAL STATES
    const [pokemonData, setPokemonData] = useState ({
    name: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    speed: null,
    height: null,
    weight: null,
    types: [],  
    });

    const [errors, setErrors] = useState({});
    const [types, setTypes] = useState([])

    useEffect(() => {
        const fetchTypes = async () => {

            try {
                const response = await axios.get("http://localhost:3001/types");
                setTypes(response.data)

            } catch (error) {
                console.error("Error fetching types:", error);
            }
        };
        fetchTypes()
    }, []);

    //HANDLE FUNCTIONS
    const handleChange = (e) => {
        const {name, value} = e.target;

        setPokemonData({
            ...pokemonData,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const handleTypeCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setPokemonData((prevData) => ({
          ...prevData,
          types: checked
            ? [...prevData.types, value]
            : prevData.types.filter((type) => type !== value),
        }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validation(pokemonData);
        setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:3001/pokemon",
          pokemonData
        );

        if (response.data.success) {
          window.alert("¡Pokemon successfully created!");
          console.log("Types:", pokemonData.types);
          setPokemonData({
            name: "",
            img: "",
            hp: "",
            attack: "",
            defense: "",
            speed: null,
            height: null,
            weight: null,
            types: [],
          });
        } else {
          console.error(
            "Error creating Pokemon:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setErrors(validationErrors);
    }
    }

  return (
    <div>
        <h2>Create a New Pokemon</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
            <label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={pokemonData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className={styles.errors}>{errors.name}</span>}
            </label>

            <label>
                <input
                  type="text"
                  name="img"
                  placeholder="Image"
                  value={pokemonData.img}
                  onChange={handleChange}
                />
                {errors.img && <span className={styles.errors}>{errors.img}</span>}
            </label>

           {["hp", "attack", "defense", "speed", "height", "weight"].map((field) => (
          <div key={field}>
            <label>
              <input
                type="number"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={pokemonData[field] || ""}
                onChange={handleChange}
              />
            </label>
            {errors[field] && <span className={styles.error}>{errors[field]}</span>}
          </div>
        ))}


            <label>
              <div>
                {types.map((type) => (
                    <label key = {type.id} className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="types"
                            value={type.name}
                            checked={pokemonData.types.includes(type.name)}
                            onChange={handleTypeCheckboxChange}
                />
                {type.name}
                    </label>
                ))}
              </div>
            {errors.types && (
            <span className={styles.error}>{errors.types}</span>
          )}
            </label>
            <button type="submit">Create Pokemon</button>
            
        </form>
    </div>
    
  );
};

export default PokemonForm;