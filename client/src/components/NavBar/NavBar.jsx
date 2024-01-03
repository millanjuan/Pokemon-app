import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import PATHROUTES from "../../helpers/PathRoutes.helper";
import SearchBar from "../SearchBar/SearchBar";
import logo from "../Image/logo.png"

const NavBar = ({onSearch}) => {
 
  return (
    <>
      <header className = {styles.container}>
        <div className={styles.navLeft}>
          <Link to = "/">
            <img
              className={styles.logo}
              src={logo}
              alt="Logo"
            />
          </Link>
        </div>

        <div className={styles.wrapperLinks}>
            <Link to={PATHROUTES.HOME} className={styles.linkRouter}>
                HOME
            </Link>

            <Link to={PATHROUTES.FORM} className={styles.linkRouter}>
                NEW POKEMON
            </Link>

            
        </div>
        <div className={styles.navRight}>
          <SearchBar onSearch = {onSearch}/>
        </div>

      </header>
    </>

  )
}

export default NavBar;