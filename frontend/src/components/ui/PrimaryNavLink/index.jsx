import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "PrimaryNavLink.module.css";

const PrimaryNavLink = ({ path, end, title }) => {
  return (
    <Nav.Link as="span">
      <NavLink className={styles.navLink} to={path} end={!!end}>
        {title}
      </NavLink>
    </Nav.Link>
  );
};

export default PrimaryNavLink;
