import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logoImg from "assets/images/logo.png";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="py-5 bg-light">
      <Container fluid>
        <Row>
          <Col sm="12" md="10" lg="8" className="mx-auto">
            <div className="d-flex flex-column align-items-center gap-4 text-center">
              <img src={logoImg} alt="Hero" style={{ width: "100px" }} />
              <p>
                Welcome to our blog, your go-to platform for insightful articles
                and stories. Share your thoughts, expertise, and experiences
                with our community. Create, read, and engage with content that
                matters to you. Start writing your first article today!
              </p>
              <div className="mt-4">
                <Button size="lg" onClick={() => navigate("/posts/create")}>
                  Add New Article
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
