import PostFromFields from "components/post/PostFormFields";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import useFormState from "hooks/useFormState";
import { useCallback, useEffect } from "react";
import { getPostBySlug } from "services/postService";
import useFetch from "hooks/useFetch";

const initialState = {
  title: "",
  summary: "",
  imageUrl: "",
  content: "",
};

function EditPostModal({ postSlug, onClose, onSubmit }) {
  const { data, loading } = useFetch(() => getPostBySlug(postSlug));

  const {
    formData: postData,
    setFormData: setPostData,
    handleChange,
    handleValueChange,
  } = useFormState(initialState);

  useEffect(() => {
    if (data) {
      setPostData({
        title: data.title,
        summary: data.summary,
        imageUrl: data.imageUrl,
        content: data.content,
      });
    }
  }, [data, setPostData]);

  const handleSubmit = useCallback(async () => {
    onSubmit({
      title: postData.title.trim(),
      summary: postData.summary.trim(),
      imageUrl: postData.imageUrl.trim(),
      content: postData.content.trim(),
    });
    onClose();
  }, [onSubmit, postData, onClose]);

  return (
    <>
      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <PostFromFields
              postData={postData}
              handleChange={handleChange}
              handleContentChange={(val) => handleValueChange("content", val)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              loading ||
              !postData.title ||
              !postData.summary ||
              !postData.content
            }
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditPostModal;
