import { SET_ALL_POKEMONS, SET_SEARCHED_POKEMON, CLEAR_SEARCHED_POKEMON } from "./action_types";
import axios from "axios";
export const setAllPokemons = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get('http://localhost:3001/pokemon');
            return dispatch ({
                type: SET_ALL_POKEMONS,
                payload:data,
            })
        } catch (error) {
            console.error("Error fetching pokemons", error.message);
        }
    };
}

export const setSearchedPokemon = (pokemon) => ({
    type: SET_SEARCHED_POKEMON,
    payload:pokemon,
});

export const clearSearchedPokemon = () => ({
    type:CLEAR_SEARCHED_POKEMON,
});
