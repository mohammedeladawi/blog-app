import LoginForm from "./LoginForm";
import { Container, Row, Col, Card } from "react-bootstrap";

const Login = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100%" }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h3 className="text-center mb-4">Login</h3>
              <LoginForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
