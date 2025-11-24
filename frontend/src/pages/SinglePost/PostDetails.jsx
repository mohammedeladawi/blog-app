import { Col, Container, Row } from "react-bootstrap";
import { formatDate } from "helpers/utils";

const PostDetails = ({ post }) => {
  const { title, summary, content, imageUrl, createdAt, updatedAt, author } =
    post;

  return (
    <Container className="my-5">
      {imageUrl && (
        <Row className="mb-4">
          <Col>
            <img
              src={imageUrl}
              alt={title}
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }}
            />
          </Col>
        </Row>
      )}

      <h1 className="mb-2">{title}</h1>
      <p className="text-muted mb-4">
        By <strong>{author.username}</strong> | Created: {formatDate(createdAt)}{" "}
        | Updated: {formatDate(updatedAt)}
      </p>

      <h5 className="mb-3">Summary</h5>
      <p className="mb-4">{summary}</p>

      <h5 className="mb-3">Content</h5>
      <p>{content}</p>
    </Container>
  );
};

export default PostDetails;
