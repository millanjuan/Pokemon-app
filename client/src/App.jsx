//REACT
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';

//STYLES AND HELPERS
import PATHROUTES from './helpers/PathRoutes.helper';
import './App.css';

//REDUX ACTIONS
import { setSearchedPokemon, clearSearchedPokemon } from './redux/actions';


//COMPONENTS
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Detail from './components/Detail/Detail';
import Cards from './components/Cards/Cards';
import SearchResult from './components/SearchResult/SearchResult';
import PokemonForm from './components/PokemonForm/PokemonForm';

function App() {
  //UTILS
  const dispatch = useDispatch();
  const {pathname} = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedPokemon = localStorage.getItem('searchedPokemon');
    if (storedPokemon) {
      dispatch(setSearchedPokemon(JSON.parse(storedPokemon)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (pathname === PATHROUTES.HOME) {
      dispatch(clearSearchedPokemon());
    }
  },[pathname, dispatch])
  

  //OnSearch function
const onSearch = async (name) => {
  try {
    dispatch(clearSearchedPokemon());
    const { data } = await axios.get(`http://localhost:3001/pokemons/name?name=${name.toLowerCase()}`);
    if (data.name) {
      localStorage.setItem('searchedPokemon', JSON.stringify(data));
      dispatch(setSearchedPokemon(data));
    } else {
      console.log('Pokémon not found');
    }
    const encodedName = encodeURIComponent(name.toLowerCase());
    navigate(`${PATHROUTES.SEARCH}?query=${encodedName}&scope=internal&navigationSearch=true`);
  }  catch (error) {
    console.error('Error fetching pokemon', error.message);
    const encodedName = encodeURIComponent(name.toLowerCase());
    navigate(`${PATHROUTES.SEARCH}?query=${encodedName}&scope=internal&navigationSearch=true`);
  }
  
};

  return (
    <div className="App">
      
      {pathname !== PATHROUTES.LANDING && <NavBar onSearch = { onSearch }/>}
      <Routes>
        <Route path = {PATHROUTES.LANDING} element = {<Landing/>} />
        <Route path = {PATHROUTES.HOME} element = {<Cards />} />
        <Route path = {PATHROUTES.DETAIL} element = {<Detail/>} />
        <Route path = {PATHROUTES.SEARCH} element = {<SearchResult/>}/>
        <Route path = {PATHROUTES.FORM} element = {<PokemonForm/>} />
      </Routes>

    </div>
  );
}

export default App;
