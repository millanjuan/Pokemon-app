import { Link } from 'react-router-dom';
import styles from "./Landing.module.css";
import PATHROUTES from '../../helpers/PathRoutes.helper';
import logo from "../Image/logo.png"

const Landing = () => {
  return (
    <div className={styles.landingContainer}>

      <div className={styles.titleWrapper}>
        <img src={logo} alt="logo" className={styles.titleImage}/>
      </div>

      <div className={styles.buttonWrapper}>
        <Link to = {PATHROUTES.HOME} className = {styles.button}>LET'S START</Link>
      </div>
    </div>
  )
}

export default Landing;