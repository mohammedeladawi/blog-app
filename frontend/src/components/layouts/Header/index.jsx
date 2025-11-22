import { Container, Nav, Navbar } from "react-bootstrap";
import styles from "./Header.module.css";
import logoImg from "assets/images/logo.png";
import { Link } from "react-router-dom";

const Header = ({ children: navLinks }) => {
  return (
    <header className={styles.header}>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img className={styles.brandLogo} src={logoImg} alt="Codv Logo" />
          </Navbar.Brand>
          <Nav className="ms-auto">{navLinks}</Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
