import { Link } from 'react-router-dom';
import styles from "./Card.module.css"

const Card = ({name, image, types}) => {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  const capitalizedTypes = types
  ? types.map((type) => {
      if (typeof type === 'string') {
        return type.charAt(0).toUpperCase() + type.slice(1);
      } else if (type && type.name) {
        return type.name.charAt(0).toUpperCase() + type.name.slice(1);
      }
      return '';
    })
  : [];
  return (
    <div className={styles.cardContainer}>
      <div className={styles.header}>
        <h2>{capitalizedName}</h2>
      </div>

      <div className={styles.wrapperImage}>
        <img className={styles.wrapperCardImage} src = {image} alt='pokemon image' />
      </div>

      <div className={styles.wrapperCardBody}>

        <div className={styles.typesText}>
          {capitalizedTypes.map((type, index) => {
            return (
              <h3 key={index}>{type.name || type}</h3>
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