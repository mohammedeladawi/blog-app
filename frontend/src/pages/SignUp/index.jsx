import SignUpForm from "./SignUpForm";
import { Container, Row, Col, Card } from "react-bootstrap";

const SignUp = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h3 className="text-center mb-4">Create an Account</h3>
              <SignUpForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
