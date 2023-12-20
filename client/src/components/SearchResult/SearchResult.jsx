import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Card from "../Card/Card"
import { clearSearchedPokemon } from "../../redux/actions"
import { useEffect } from "react"

const SearchResult = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");

    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
          dispatch(clearSearchedPokemon());
        };
      }, [dispatch]);

    const searchedPokemon = useSelector((state) => state.searchedPokemon)
  return (
    <div>
        <h2>Search Results for "{query}"</h2>
        {searchedPokemon && <Card 
          name = {searchedPokemon.name}
          image = {searchedPokemon.img}
          types = {searchedPokemon.types}/>}
    </div>
  )
}

export default SearchResult