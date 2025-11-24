import LoadingSpinner from "components/common/LoadingSpinner";
import useFetch from "hooks/useFetch";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getPostBySlug } from "services/postService";
import PostDetails from "./PostDetails";

const SinglePost = () => {
  const { slug } = useParams();
  const { loading, error, data: post } = useFetch(() => getPostBySlug(slug));

  return (
    <>
      {/* Loading */}
      {loading && <LoadingSpinner />}

      {/* Error Message */}
      {!loading && error && (
        <div className="text-center my-3">
          <Alert>{error}</Alert>
        </div>
      )}

      {/*Post Details*/}
      {post && <PostDetails post={post} />}
    </>
  );
};

export default SinglePost;
