import DangerAlert from "components/common/DangerAlert";
import LoadingSpinner from "components/common/LoadingSpinner";
import PostCard from "components/post/PostCard";
import OptionsMenu from "components/post/PostCard/OptionsMenu";
import useInfiniteScrollPosts from "hooks/useInfiniteScrollPosts";
import { useCallback } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { deletePost, updatePost } from "services/postService";

const Posts = () => {
  const { loading, error, posts, observerRef, refetch } =
    useInfiniteScrollPosts();

  const loggedInUserId = useSelector((s) => s.auth.userId);

  const handleDelete = useCallback(
    async (id) => {
      try {
        await deletePost(id);
        refetch();
      } catch (err) {
        // ======= Todo: add global alert =======
        console.log(err);
      }
    },
    [refetch]
  );

  const handleEdit = useCallback(
    async (id, updatedPost) => {
      try {
        await updatePost(id, updatedPost);
        refetch();
      } catch (err) {
        // ======= Todo: add global alert =======
        console.log(err);
      }
    },
    [refetch]
  );

  return (
    <Container>
      <h3 className="text-center my-4"> Latest Posts</h3>

      {/* Posts */}
      <Row className="g-4">
        {posts?.map(
          ({ id, slug, imageUrl, title, summary, createdAt, author }) => (
            <Col xs={12} sm={6} lg={3} key={id}>
              <PostCard
                slug={slug}
                imgUrl={imageUrl}
                title={title}
                summary={summary}
                createdAt={createdAt}
                author={author.username}
                createdByUser={loggedInUserId === author.id}
                renderOptions={() => (
                  <OptionsMenu
                    postSlug={slug}
                    onDelete={() => handleDelete(id)}
                    onEdit={(updatedPost) => handleEdit(id, updatedPost)}
                  />
                )}
              />
            </Col>
          )
        )}
      </Row>

      {/* Loading */}
      {loading && <LoadingSpinner />}

      {/* Error Message */}
      {!loading && error && <DangerAlert msg={error} />}

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
