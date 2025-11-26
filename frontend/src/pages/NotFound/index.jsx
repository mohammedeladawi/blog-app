import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", textAlign: "center" }}
    >
      <Row>
        <Col>
          <h1 className="display-3 fw-bold">404</h1>
          <p className="text-muted fs-5 mb-4">
            Oops! The page you're looking for doesn't exist.
          </p>

          <Link to="/">
            <Button variant="primary">Go Back Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
