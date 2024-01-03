import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import Icons from '../Icons/Icons';

const Detail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/pokemons/name?name=${name.toLowerCase()}`);

        if (data && data.types) {
          setPokemon({
            ...data,
            types: data.types
          });
        }
      } catch (error) {
        console.error("Error fetching pokemon", error.message);
      }
    };

    fetchPokemon();
  }, [name]);

  const capitalizedName = pokemon.name ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) : '';
  const capitalizedTypes = pokemon.types
    ? pokemon.types.map((type) => {
        if (typeof type === 'string') {
          return type.charAt(0).toUpperCase() + type.slice(1);
        } else if (type && type.name) {
          return type.name.charAt(0).toUpperCase() + type.name.slice(1);
        }
        return '';
      })
    : [];

  return (
    <div className={`${styles.wrapperDetail} ${imageLoaded ? styles.loaded : ''}`}>
      {pokemon && pokemon.name ? (
        <>
          <div className={styles.wrapperImg}>
            <img
              src={pokemon.img}
              alt={`${pokemon.name} image`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          <div className={styles.wrapperText}>
            <div className={styles.wrapperName}>
              <h1>{capitalizedName}</h1>
            </div>
            <div className={styles.wrapperStats}>
              <h2>HP: {pokemon.hp}</h2>
              <h2>ATTACK: {pokemon.attack}</h2>
              <h2>DEFENSE: {pokemon.defense}</h2>
              <h2>SPEED: {pokemon.speed !== null ? pokemon.speed : 'Unknown'}</h2>
              <h2>HEIGHT: {pokemon.height !== null ? pokemon.height : 'Unknown'}</h2>
              <h2>WEIGHT: {pokemon.weight !== null ? pokemon.weight : 'Unknown'}</h2>
            </div>

            <div className={styles.typesText}>
              {capitalizedTypes.map((type, index) => (
                <div key={index} className={styles.iconContainer}>
                  <h3 className={styles.typeName}>{type}</h3>
                  <Icons className={styles.icon} type={type} />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Detail;