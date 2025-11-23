import PostCard from "components/common/PostCard";
import useInfiniteScrollPosts from "hooks/useInfiniteScrollPosts";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";

const Posts = () => {
  const { loading, error, posts, observerRef } = useInfiniteScrollPosts();
  return (
    <Container>
      <h3 className="text-center my-4"> Latest Posts</h3>

      <Row className="g-4">
        {/* Posts */}
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

      {/* Loading */}
      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* Error Message */}
      {!loading && error && (
        <div>
          <Alert className="text-center my-3">{error}</Alert>
        </div>
      )}

      {/* No Posts */}
      {!loading && !error && !posts && (
        <div>
          <p className="text-center my-3">There is no posts</p>
        </div>
      )}
      <div ref={observerRef} style={{ height: "1px" }}></div>
    </Container>
  );
};

export default Posts;
