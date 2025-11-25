import { Form } from "react-bootstrap";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const PostFromFields = ({ postData, handleChange, handleContentChange }) => {
  return (
    <>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Post Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="Enter post title"
          value={postData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formSummary">
        <Form.Label>Post Summary</Form.Label>
        <Form.Control
          type="text"
          name="summary"
          placeholder="Enter post summary"
          value={postData.summary}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formImageUrl">
        <Form.Label>Post Image</Form.Label>
        <Form.Control
          type="text"
          name="imageUrl"
          placeholder="Enter image URL"
          value={postData.imageUrl}
          onChange={handleChange}
        />
      </Form.Group>
      <ReactQuill
        theme="snow"
        value={postData.content}
        onChange={handleContentChange}
        placeholder="Write something..."
      />
    </>
  );
};

export default PostFromFields;
