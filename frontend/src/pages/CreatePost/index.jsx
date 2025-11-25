import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useCallback, useState } from "react";
import useApi from "hooks/useApi";
import { createPost } from "services/postService";
import PostFromFields from "./PostFromFields";

const inititalState = {
  title: "",
  summary: "",
  imageUrl: "",
  content: "",
};

const CreatePost = () => {
  const [postData, setPostData] = useState(inititalState);
  const { data, loading, error, callApi } = useApi();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value) => {
    setPostData((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await callApi(() =>
        createPost({
          ...postData,
          title: postData.title.trim(),
          summary: postData.summary.trim(),
          imageUrl: postData.imageUrl.trim(),
          content: postData.content.trim(),
        })
      );
      if (!error) setPostData(inititalState);
    },
    [postData, callApi, error]
  );

  return (
    <section className="py-5">
      <Container>
        {!loading && error && <Alert variant="danger">{error}</Alert>}
        {!loading && data && (
          <Alert variant="success">Post created successfully!</Alert>
        )}

        <Row>
          <Col md="8" lg="6" className="mx-auto">
            <h2 className="mb-4"> Add New Post</h2>

            <Form onSubmit={handleSubmit}>
              <PostFromFields
                postData={postData}
                handleChange={handleChange}
                handleContentChange={handleContentChange}
              />

              <Button
                type="submit"
                className="mt-4 w-100"
                disabled={
                  loading ||
                  !postData.title ||
                  !postData.summary ||
                  !postData.content
                }
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CreatePost;
