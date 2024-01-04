import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import styles from "./SearchResult.module.css";

const SearchResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");


  const searchedPokemon = useSelector((state) => state.searchedPokemon);

  return (
    <div className={styles.searchResultContainer}>
      <h2>Search Results for "{query}"</h2>

      {searchedPokemon ? (
        <Card
          name={searchedPokemon.name}
          image={searchedPokemon.img}
          types={searchedPokemon.types}
        />
      ) : (
        <h2>Pokémon not found</h2>
      )}
    </div>
  );
};

export default SearchResult;