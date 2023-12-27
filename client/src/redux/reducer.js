import { SET_ALL_POKEMONS, SET_SEARCHED_POKEMON, CLEAR_SEARCHED_POKEMON, FILTER_BY_TYPE_AND_ORIGIN, ORDER_CARDS } from "./action_types";

const initialState = {
    allPokemon : [],
    searchedPokemon : null,
};

const rootReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_ALL_POKEMONS:
            return {...state, allPokemon:payload}
            
        case SET_SEARCHED_POKEMON:
            return {...state, searchedPokemon: payload}

        case CLEAR_SEARCHED_POKEMON:
            return {...state, searchedPokemon:null};
    
        default:
            return {
                ...state,
            }
    }
};

export default rootReducer;