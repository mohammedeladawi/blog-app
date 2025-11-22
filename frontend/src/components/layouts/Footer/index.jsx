import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`bg-dark ${styles.footer}`}>
      <p> copyrights &#169; 2023 </p>
    </footer>
  );
};

export default Footer;
