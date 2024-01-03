import styles from "./Footer.module.css";
import github from "./images/github.png";
import linkedin from "./images/linkedin.png";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.socialIconsContainer}>
        <a
          href="https://github.com/millanjuan"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className={styles.socialIcon1} src={github} alt="GitHub" />
        </a>
        <a
          href="https://linkedin.com/in/tu-usuario"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className={styles.socialIcon2} src={linkedin} alt="LinkedIn" />
        </a>
      </div>
    </div>
  );
};

export default Footer;