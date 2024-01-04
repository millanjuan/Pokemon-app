import { 
    SET_ALL_POKEMONS, 
    GET_TYPES, 
    SET_SEARCHED_POKEMON, 
    CLEAR_SEARCHED_POKEMON, 
    FILTER_BY_TYPE, 
    FILTER_BY_ORIGIN, 
    ORDER_POKEMON,
} from "./action_types";

import axios from "axios";


const endpointTypes = 'http://localhost:3001/types';
const endpointPokemons = 'http://localhost:3001/pokemons';

export const setAllPokemons = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get(endpointPokemons);
            return dispatch ({
                type: SET_ALL_POKEMONS,
                payload:data,
            })
        } catch (error) {
            console.error("Error fetching pokemons", error.message);
        }
    };
}

export const orderPoke = (orderType, order) => {
    return {
        type: ORDER_POKEMON,
        payload: { orderType, order },
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
            const types = response.data.map((type) => type.name)
            
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
