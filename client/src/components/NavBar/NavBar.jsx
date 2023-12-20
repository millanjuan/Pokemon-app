import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import PATHROUTES from "../../helpers/PathRoutes.helper";
import SearchBar from "../SearchBar/SearchBar";

const Nav = ({onSearch}) => {
 
  return (
    <>
      <header className = {styles.container}>
        <Link to = "/" className={styles.logo}>
          <img
            src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png"
            alt="Logo"
          />
        </Link>
        <div className={styles.wrapperButtons}>
            <Link to={PATHROUTES.HOME} className={styles.linkRouter}>
                Home
            </Link>

            <Link to={PATHROUTES.FORM} className={styles.linkRouter}>
                New Pokemon
            </Link>

            
        </div>
        <div className={styles.searchBar}>
          <SearchBar onSearch = {onSearch}/>
        </div>

      </header>
    </>

  )
}

export default Nav;