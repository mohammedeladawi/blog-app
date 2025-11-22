import Header from "layouts/Header";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const AuthHeader = () => {
  return (
    <Header>
      <Nav.Link as={NavLink} to="/">
        Home
      </Nav.Link>
      <Nav.Link as={NavLink} to="/login">
        Login
      </Nav.Link>
      <Nav.Link as={NavLink} to="/register">
        Sign Up
      </Nav.Link>
    </Header>
  );
};

export default AuthHeader;
