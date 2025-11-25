import LoadingSpinner from "components/common/LoadingSpinner";
import useFetch from "hooks/useFetch";
import { useParams } from "react-router-dom";
import { getPostBySlug } from "services/postService";
import PostDetails from "./PostDetails";
import DangerAlert from "components/common/DangerAlert";

const SinglePost = () => {
  const { slug } = useParams();
  const { loading, error, data: post } = useFetch(() => getPostBySlug(slug));

  return (
    <>
      {/* Loading */}
      {loading && <LoadingSpinner />}

      {/* Error Message */}
      {!loading && error && <DangerAlert msg={error} />}

      {/*Post Details*/}
      {post && <PostDetails post={post} />}
    </>
  );
};

export default SinglePost;
