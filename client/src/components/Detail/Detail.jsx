import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css"
const Detail = () => {
  const { name } = useParams()
  const  [pokemon, setPokemon] = useState({});
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/pokemon/${name.toLowerCase()}`)
        if(data.name){
          setPokemon(data);
       } else {
          window.alert('Pokemon not found');
        }
        
      } catch (error) {
        console.error("Error fetching pokemon", error.message)
      }
      
    }
    fetchPokemon();
  }, [name])
  return (
    <div className={styles.wrapperDetail}>
      {pokemon ? (
        <>
        <div className = {styles.wrapperImg}> 
          <img
            src = {pokemon.img}
            alt={`${pokemon.name} image`}
            />
        </div>

        <div className={styles.wrapperText}>
          <h1>name:{pokemon.name}</h1>
          <h2>hp:{pokemon.hp}</h2>
          <h2>attack:{pokemon.attack}</h2>
          <h2>defense:{pokemon.defense}</h2>
          <h2>speed:{pokemon.speed}</h2>
          <h2>height:{pokemon.height}</h2>
          <h2>weight:{pokemon.weight}</h2>
          <h2>types:{pokemon.types && pokemon.types.join(', ')}</h2>

          </div>
          </>
      ): (
        <h1>Error loading pokemon. Please try again later.</h1>
      )}
    </div>
  );
};

export default Detail