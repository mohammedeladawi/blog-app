import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PostCard from "components/common/PostCard";
import { getLatestPosts } from "services/postService";
import useFetch from "hooks/useFetch";

const LatestPosts = () => {
  const navigate = useNavigate();
  const { loading, error, data: posts } = useFetch(getLatestPosts, []);

  return (
    <section className="py-5">
      <Container>
        <h3 className="text-center"> Latest Article</h3>

        <Row className="g-4 my-4">
          {loading && (
            <Col className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Col>
          )}

          {!loading && error && (
            <Col xs={12}>
              <Alert className="text-center">{error}</Alert>
            </Col>
          )}

          {!loading && !error && !posts && (
            <Col xs={12}>
              <p className="text-center">There is no posts</p>
            </Col>
          )}

          {!loading &&
            !error &&
            posts?.map((post) => (
              <Col xs={12} sm={6} lg={3} key={post.id}>
                <PostCard
                  slug={post.slug}
                  imgUrl={post.imageUrl}
                  title={post.title}
                  summary={post.summary}
                  createdAt={post.createdAt}
                  author={post.author.username}
                />
              </Col>
            ))}
        </Row>

        <Row className="mt-4">
          <Col className="text-center">
            <Button
              variant="outline-dark"
              className="px-5"
              onClick={() => navigate("/posts")}
            >
              see all
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default LatestPosts;
