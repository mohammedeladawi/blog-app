import { formatDate } from "helpers/utils";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const PostCard = ({ slug, imgUrl, title, summary, author, createdAt }) => {
  return (
    <Link to={`/posts/${slug}`} className="text-decoration-none">
      <Card>
        <Card.Img
          variant="top"
          src={imgUrl}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="text-truncate">{title}</Card.Title>
          <Card.Text className="text-truncate">{summary}</Card.Text>

          <small className="text-muted d-block mt-2">
            {author} — {formatDate(createdAt)}
          </small>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default PostCard;
