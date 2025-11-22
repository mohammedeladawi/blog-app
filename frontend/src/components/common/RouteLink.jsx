import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

const RouteLink = ({ title, path, ...props }) => {
  return (
    <Nav.Link as={NavLink} to={path} {...props}>
      {title}
    </Nav.Link>
  );
};

export default RouteLink;
