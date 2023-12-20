import { useState } from "react";
import axios from "axios";

//estado
const [pokemons, setPokemon] = useState([]);
const onSearch = async (name) => {
    
    try {

        const {data} = await axios.get(`http://localhost:3001/pokemon/${name.toLowerCase()}`)
        if(data.name){
           setPokemon((oldPokemons) => [...oldPokemons, data]);
        } else {
           window.alert('Pokemon not found');
        }
     } catch (error) {
        console.error("Error fetching pokemon", error.message)
     }
    
}

export default onSearch;