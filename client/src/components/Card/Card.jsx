import { Link } from 'react-router-dom';
import styles from "./Card.module.css"
import Icons from '../Icons/Icons';
import { useState, useEffect } from 'react';

const Card = ({name, image, types}) => {

  const [imageLoaded, setImageLoaded] = useState(false);
  
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
    <div className={`${styles.cardContainer} ${imageLoaded ? styles.loaded : ''}`}>
      <div className={styles.wrapperCardImage}>
        <img
          src={image}
          alt='pokemon image'
          onLoad={() => setImageLoaded(true)} 
        />
        <Link className={styles.linkName} to={`/detail/${name}`}>
          <h2 className={styles.wrapperName}>{capitalizedName}</h2>
        </Link>
      </div>

      <div className={styles.wrapperCardBody}>

        <div className={styles.typesText}>
        {capitalizedTypes.map((type, index) => (
            <div key={index} className={styles.iconContainer}>
              <h3 className={styles.typeName}>{type}</h3>
              <Icons className= {styles.icon} type={type} />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Card;