import { Link } from 'react-router-dom';
import styles from "./Landing.module.css";
import PATHROUTES from '../../helpers/PathRoutes.helper';

const Landing = () => {
  return (
    <div className={styles.landingContainer}>

      <div className={styles.titleWrapper}>
        <img className={styles.titleImage} src="C:\Users\milla\OneDrive\Documentos\Henry\PI\PI-Pokemon-main\client\src\images\logo.png" alt="logo" />
      </div>

      <div className={styles.buttonWrapper}>
        <Link to = {PATHROUTES.HOME} className = {styles.buton}>INGRESAR</Link>
      </div>
    </div>
  )
}

export default Landing;