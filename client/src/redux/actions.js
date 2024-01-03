import { 
    SET_ALL_POKEMONS, 
    GET_TYPES, 
    SET_SEARCHED_POKEMON, 
    CLEAR_SEARCHED_POKEMON, 
    FILTER_BY_TYPE, 
    FILTER_BY_ORIGIN, 
    ORDER_POKE_BY_NAME, 
    ORDER_POKE_BY_ATTACK, 
} from "./action_types";

import axios from "axios";


const endpointTypes = 'http://localhost:3001/types';

export const setAllPokemons = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get('http://localhost:3001/pokemons');
            return dispatch ({
                type: SET_ALL_POKEMONS,
                payload:data,
            })
        } catch (error) {
            console.error("Error fetching pokemons", error.message);
        }
    };
}

export const orderPokeByName = (order) => {
    return {
        type: ORDER_POKE_BY_NAME,
        payload: order,
    };
};

export const orderPokeByAttack = (order) => {
    return {
        type: ORDER_POKE_BY_ATTACK,
        payload:order,
    };
};
export const setSearchedPokemon = (pokemon) => ({
    type: SET_SEARCHED_POKEMON,
    payload:pokemon,
});

export const getTypes = () => {
    return async function(dispatch){
        try {
            const response = await axios.get(endpointTypes);
            const types = response.data.map((type) => type.name.charAt(0).toUpperCase() + type.name.slice(1))
            
            return dispatch({ 
                type:GET_TYPES,
                payload: types
    
            })
        } catch (error) {
            console.log(error);
        }
    }
};
export const clearSearchedPokemon = () => ({
    type:CLEAR_SEARCHED_POKEMON,
});

export const filterPokemonsByType = (type) => ({
    type: FILTER_BY_TYPE,
    payload: type,
});

export const filterPokemonByOrigin = (origin) => ({
    type: FILTER_BY_ORIGIN,
    payload:origin,
});


export const orderCards = (order) => ({
    type: ORDER_CARDS,
    payload:order,
});
