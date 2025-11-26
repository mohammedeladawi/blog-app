import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PostCard from "components/post/PostCard";
import { getLatestPosts } from "services/postService";
import useFetch from "hooks/useFetch";
import LoadingSpinner from "components/common/LoadingSpinner";

const LatestPosts = () => {
  const navigate = useNavigate();
  const { loading, error, data: posts } = useFetch(getLatestPosts, []);

  return (
    <section className="py-5">
      <Container>
        <h3 className="text-center"> Latest Articles</h3>

        {/* Loading */}
        {loading && <LoadingSpinner />}

        {/* Error Message */}
        {!loading && error && (
          <div className="text-center my-3">
            <Alert variant="danger">{error}</Alert>
          </div>
        )}

        {/* No Posts */}
        {!loading && !error && !posts && (
          <div className="text-center my-3">
            <p>There is no posts</p>
          </div>
        )}

        <Row className="g-4 my-4">
          {posts?.map((post) => (
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

        <div className="text-center">
          <Button
            variant="outline-dark"
            className="px-5"
            onClick={() => navigate("/posts")}
          >
            See All
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default LatestPosts;
