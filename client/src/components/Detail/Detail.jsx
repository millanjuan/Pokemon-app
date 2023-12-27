import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

const Detail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/pokemon/name/${name.toLowerCase()}`);

        if (data && data.name) {
          const capitalizedTypes = data.types.map((type) => type.name.charAt(0).toUpperCase() + type.name.slice(1));
          setPokemon({
            ...data,
            types: capitalizedTypes,
          });
        } else {
          window.alert('Pokemon not found');
        }
      } catch (error) {
        console.error("Error fetching pokemon", error.message);
      }
    };

    fetchPokemon();
  }, [name]);

  const capitalizedName = pokemon.name ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) : '';

  return (
    <div className={styles.wrapperDetail}>
      {pokemon && pokemon.name ? (
        <>
          <div className={styles.wrapperImg}>
            <img src={pokemon.img} alt={`${pokemon.name} image`} />
          </div>

          <div className={styles.wrapperText}>
            <h1>{capitalizedName}</h1>
            <h2>HP: {pokemon.hp}</h2>
            <h2>ATTACK: {pokemon.attack}</h2>
            <h2>DEFENSE: {pokemon.defense}</h2>
            <h2>SPEED: {pokemon.speed !== null ? pokemon.speed : 'Unknown'}</h2>
            <h2>HEIGHT: {pokemon.height !== null ? pokemon.height : 'Unknown'}</h2>
            <h2>WEIGHT: {pokemon.weight !== null ? pokemon.weight : 'Unknown'}</h2>
            <h2>TYPES: {pokemon.types && pokemon.types.join(', ')}</h2>
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Detail;