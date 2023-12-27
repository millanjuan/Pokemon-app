import Card from "../Card/Card";
import { useState, useEffect } from "react";
import styles from "./Cards.module.css"
import { useSelector,useDispatch } from "react-redux";
import { setAllPokemons } from "../../redux/actions";

const Cards = () => {

  //Redux GLOBAL STATES
  const pokemons = useSelector((state) => state.allPokemon);
  const searchedPokemon = useSelector((state) => state.searchedPokemon);
 

// Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

// Index
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;

const searchedPokemonArray = searchedPokemon ? [searchedPokemon] : [];
const currentPokemons = searchedPokemonArray.length > 0 ? searchedPokemonArray : pokemons.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(pokemons.length / itemsPerPage)

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAllPokemons());
  },[dispatch]);
  
  return (
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
      <h1>Loading...</h1>
      )}

      <div className={styles.paginationControls}>
        {currentPage > 1 && (
          <button className = {styles.wrapperPrevButton} onClick={() => handlePageChange(currentPage - 1)}>Prev</button>
        )}

        <span className={styles.wrapperSpan} >Page {currentPage} of {totalPages}</span>

        {indexOfLastItem < pokemons.length && (
          <button className = {styles.wrapperNextButton} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  
  );
};

export default Cards;