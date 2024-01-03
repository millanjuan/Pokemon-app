import { useState } from "react"
import styles from "./SearchBar.module.css"

const SearchBar = (props) => {
  const [name, setName] = useState("");
  const handleChange = (e) => {
    setName(e.target.value);
  }

  const { onSearch } = props;
  return (
    <div className={styles.container}>
      <input className={styles.input} placeholder = "Search a pokemon.." type="search" onChange={handleChange} value = {name}/>
      <button className={styles.button} onClick={() => onSearch(name)}>SEARCH</button>
    </div>
  )
}

export default SearchBar