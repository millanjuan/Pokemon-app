import Card from "../Card/Card";
import Sidebar from "../Sidebar/Sidebar";
import Pagination from "../Pagination/Pagination";
import { useState, useEffect } from "react";
import styles from "./Cards.module.css"
import { useSelector,useDispatch } from "react-redux";
import { 
  setAllPokemons, 
  filterPokemonByOrigin, 
  filterPokemonsByType, 
  getTypes, 
  orderPokeByName, 
  orderPokeByAttack 
} from "../../redux/actions";

const Cards = () => {

  //Redux Global States
  const allPokemons = useSelector((state) => state.pokemones);
  const types = useSelector((state) => state.types)
  //Local States
  const [currentPage, setCurrentPage] = useState(1);
  const [sortPokemons, setSortPokemons] = useState([]);

  //Utils
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(setAllPokemons());
    dispatch(getTypes());
  },[dispatch]);

  //Index
  const pokemonsPerPage = 12;
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  //Handle Functions
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOrderPokeByName = (event) => {
    const order = event.target.value;
    dispatch(orderPokeByName(order));
    setSortPokemons(order === 'All' ? [] : [order]);
  };

  const handleOrderPokeByAttack = (event) => {
    const order = event.target.value;
    dispatch(orderPokeByAttack(order));
    setSortPokemons(order === 'All' ? [] : [order]);
  };
 
  const handleTypeFilter = (event) => {
    const selectedType = event.target.value;
    dispatch(filterPokemonsByType(selectedType));
    setCurrentPage(1);
    setSortPokemons(sortPokemons.filter(sortType => sortType !== selectedType));
  };

  const handleFilterOrigin = (event) => {
    const selectedOrigin = event.target.value;
    dispatch(filterPokemonByOrigin(selectedOrigin));
    setCurrentPage(1);
    setSortPokemons(sortPokemons.filter(sortOrigin => sortOrigin !== selectedOrigin));
  };

  const currentPokemons = Array.isArray(allPokemons) 
  ? allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) 
  :[allPokemons];

  const totalPages = Math.ceil(allPokemons.length / pokemonsPerPage)
    
  return (
    <div className={styles.conteiner}>
      <div className={styles.sidebar}>
        <Sidebar
          handleOrderPokeByName={handleOrderPokeByName}
          handleOrderPokeByAttack={handleOrderPokeByAttack}
          handleTypeFilter={handleTypeFilter}
          handleFilterOrigin={handleFilterOrigin}
          types={types}
        />
      </div>

      
      <div className={styles.content}>
        <div className={styles.wrapperCards}>
          {currentPokemons.length > 0 ? (
            currentPokemons.map(({id, name, img, types, hp, attack, defense, speed, height, weight}) => {
              return (
                <Card
                key = {id}
                id = {id}
                name = {name}
                image = {img}
                types = {types}
                hp = {hp}
                attack = {attack}
                defense = {defense}
                speed = {speed}
                height = {height}
                weight = {weight}
                />
              )
            })
          ): (
            <div className={styles.loading}>
              <h1>Loading...</h1>
            </div>
          )}
        </div>
        <div className={styles.paginationControls}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

    </div>
   
  
  );
};

export default Cards;