import { useState } from "react"
import styles from "./SearchBar.module.css"

const SearchBar = (props) => {
  const [name, setName] = useState("");
  const handleChange = (e) => {
    setName(e.target.value);
  }

  const { onSearch } = props;
  return (
    <div>
      <input className={styles.input} type="search" onChange={handleChange} value = {name}/>
      <button className={styles.wrapperButton} onClick={() => onSearch(name)}>Search</button>
    </div>
  )
}

export default SearchBar