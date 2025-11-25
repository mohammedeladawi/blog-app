import { Link } from "react-router-dom";
import styles from "./PostCard.module.css";
import { formatDate } from "helpers/utils";

const PostCard = ({
  slug,
  title,
  summary,
  imgUrl,
  author,
  createdAt,
  createdByUser = false,
  renderOptions,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imgWrapper}>
        <Link to={`/posts/${slug}`}>
          <img src={imgUrl} alt={title} className={styles.image} />
        </Link>

        {createdByUser && renderOptions && renderOptions()}
      </div>

      <Link to={`/posts/${slug}`} className={styles.link}>
        <div className={styles.body}>
          <h5 className={styles.title}>{title}</h5>
          <p className={styles.summary}>{summary}</p>
          <small className={styles.meta}>
            {author} • {formatDate(createdAt)}
          </small>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
