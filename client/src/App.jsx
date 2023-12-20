//React and helpers
import PATHROUTES from './helpers/PathRoutes.helper';
import './App.css';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from 'react';
import axios from "axios";

//redux
import { useDispatch } from 'react-redux';
import { setSearchedPokemon, clearSearchedPokemon } from './redux/actions';


//Components
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Detail from './components/Detail/Detail';
import Cards from './components/Cards/Cards';
import SearchResult from './components/SearchResult/SearchResult';

function App() {

  const dispatch = useDispatch();
  const {pathname} = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedPokemon = localStorage.getItem('searchedPokemon');
    if (storedPokemon) {
      dispatch(setSearchedPokemon(JSON.parse(storedPokemon)));
    }
  }, [dispatch]);

  //OnSearch function
  const onSearch = async (name) => {
    
    try {

        const {data} = await axios.get(`http://localhost:3001/pokemon/${name.toLowerCase()}`)
        if(data.name){
          
          localStorage.setItem('searchedPokemon', JSON.stringify(data));

           dispatch(setSearchedPokemon(data));

           const encodedName = encodeURIComponent(name.toLowerCase());
           navigate(`${PATHROUTES.SEARCH}?query=${encodedName}&scope=internal&navigationSearch=true`);
        } else {
           window.alert('Pokemon not found');
        }
     } catch (error) {
        console.error("Error fetching pokemon", error.message)
     }
    
}




useEffect(() => {
  if (pathname === PATHROUTES.HOME) {
    dispatch(clearSearchedPokemon());
  }
},[pathname, dispatch])


  return (
    <div className="App">
      {pathname !== PATHROUTES.LANDING && <NavBar onSearch = { onSearch }/>}

      <Routes>
        <Route path = {PATHROUTES.LANDING} element = {<Landing/>} />
        <Route path = {PATHROUTES.HOME} element = {<Cards />} />
        <Route path = {PATHROUTES.DETAIL} element = {<Detail/>} />
        <Route path = {PATHROUTES.SEARCH} element = {<SearchResult/>}/>

      </Routes>
      
    </div>
  );
}

export default App;
