import styles from './Icons.module.css';
import Bug from './image/Bug.png';
import Dark from './image/Dark.png';
import Dragon from './image/Dragon.png';
import Electric from './image/Electric.png';
import Fairy from './image/Fairy.png';
import Fighting from './image/Fighting.png';
import Fire from './image/Fire.png';
import Flying from './image/Flying.png';
import Ghost from './image/Ghost.png';
import Grass from './image/Grass.png';
import Ground from './image/Ground.png';
import Ice from './image/Ice.png';
import Normal from './image/Normal.png';
import Poison from './image/Poison.png';
import Psychic from './image/Psychic.png';
import Rock from './image/Rock.png';
import Shadow from './image/Shadow.png';
import Steel from './image/Steel.png';
import Unknown from './image/Unknown.png';
import Water from './image/Water.png';

const icon = {
    Bug: Bug,
    Dark: Dark,
    Dragon: Dragon,
    Electric: Electric,
    Fairy: Fairy,
    Fighting: Fighting,
    Fire: Fire,
    Flying: Flying,
    Ghost: Ghost,
    Grass: Grass,
    Ground: Ground,
    Ice: Ice,
    Normal: Normal,
    Poison: Poison,
    Psychic: Psychic,
    Rock: Rock,
    Shadow: Shadow,
    Steel: Steel,
    Unknown: Unknown,
    Water: Water
}

const Icons = ({type}) => {

    return (
        <div className={styles.iconsContainer}>
            <img className={styles.icon} src={icon[type] }/> 
        </div>
    )
}

export default Icons;