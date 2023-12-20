import axios from "axios";
import { setAllPokemons } from "./actions";

export const fetchAllPokemons = () => async (dispatch) => {
    try {
        const {data} = await axios.get('http://localhost:3001/pokemon');
        return dispatch(setAllPokemons(data));
    } catch (error) {
        console.error("Error fetching pokemons", error.message);
    }
};