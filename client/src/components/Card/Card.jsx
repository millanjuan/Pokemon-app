import { Link } from 'react-router-dom';
import PATHROUTES from '../../helpers/PathRoutes.helper';
import styles from "./Card.module.css"

const Card = ({name, image, types}) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.header}>
        <h2>{name}</h2>
      </div>

      <div className={styles.wrapperImage}>
        <img className={styles.wrapperCardImage} src = {image} alt='pokemon image' />
      </div>

      <div className={styles.wrapperCardBody}>

        <div className={styles.typesText}>
          {types.map((type, index) => {
            return (
              <h3 key={index}>{type}</h3>
            )
          })}
        </div>

        <div className={styles.wrapperButton}>
          <Link to = {`/detail/${name}`}>
           <button className={styles.button}>STATS</button>
          </Link>
         
        </div>
      </div>

    </div>
  )
}

export default Card;