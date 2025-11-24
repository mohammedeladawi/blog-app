import LoadingSpinner from "components/common/LoadingSpinner";
import PostCard from "components/common/PostCard";
import useInfiniteScrollPosts from "hooks/useInfiniteScrollPosts";
import { Alert, Col, Container, Row } from "react-bootstrap";

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
      {loading && <LoadingSpinner />}

      {/* Error Message */}
      {!loading && error && (
        <div className="text-center my-3">
          <Alert>{error}</Alert>
        </div>
      )}

      {/* No Posts */}
      {!loading && !error && !posts && (
        <div className="text-center my-3">
          <p>There is no posts</p>
        </div>
      )}
      <div ref={observerRef} style={{ height: "1px" }}></div>
    </Container>
  );
};

export default Posts;
