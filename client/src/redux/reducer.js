import { SET_ALL_POKEMONS, 
    GET_TYPES, 
    SET_SEARCHED_POKEMON, 
    CLEAR_SEARCHED_POKEMON, 
    FILTER_BY_ORIGIN, 
    ORDER_POKEMON,
    FILTER_BY_TYPE } from "./action_types";

const initialState = {
    allPokemon : [],
    searchedPokemon : null,
    pokemones: [],
    types: [],
};

const rootReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_ALL_POKEMONS:
            return {
                ...state, 
                pokemones: payload,
                allPokemon: payload,
                
            }
        case ORDER_POKEMON:
            let allPoke;
            if (payload.orderType === 'name') {
                allPoke = payload.order === 'asc'
                    ? [...state.allPokemon].sort((a, b) => a.name.localeCompare(b.name))
                    : [...state.allPokemon].sort((a, b) => b.name.localeCompare(a.name));
            } else if (payload.orderType === 'attack') {
                allPoke = payload.order === 'asc'
                    ? [...state.allPokemon].sort((a, b) => a.attack - b.attack)
                    : [...state.allPokemon].sort((a, b) => b.attack - a.attack);
            }
    
                return {
                    ...state,
                    pokemones: payload.order === 'All' ? state.allPokemon : allPoke,
                };
    
        case GET_TYPES:
            return {
                ...state,
                types: payload,
            }
            
        case SET_SEARCHED_POKEMON:
            return {...state, searchedPokemon: payload}

        case CLEAR_SEARCHED_POKEMON:
            return {...state, searchedPokemon:null};

        case FILTER_BY_TYPE:
            const allPokemones = state.allPokemon;
            const filteredPokemons = payload === "All" 
                ? allPokemones 
                :allPokemones.filter((poke) => {
                    if(Number.isInteger(poke.id)){
                        //Tipos de la API
                         return poke.types.includes(payload);
                    }else{
                        //Tipos de la BD
                        return poke.types.some((type) => type.name === payload);    
                    }
                })

            return {
                ...state,
                pokemones: filteredPokemons,
            };

        case FILTER_BY_ORIGIN:
            const createdFilter = payload === "api"
            ? state.allPokemon.filter((pokemon) => Number.isInteger(pokemon.id))
            : state.allPokemon.filter((pokemon) => !Number.isInteger(pokemon.id))
            return {
                ...state,
                pokemones: payload === "All"
                ? state.allPokemon
                : createdFilter
            }
    
        default:
            return {
                ...state,
            }
    }
};

export default rootReducer;