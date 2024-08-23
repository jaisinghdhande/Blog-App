import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  _id,
  title,
  content,
  cover,
  summary,
  createdAt,
  author,
}) {
  const { username } = author;
  return (
    <div className="post">
      <Link to={`post/${_id}`}>
        <div className="post-image">
          <img src={"http://localhost:4000/" + cover}></img>
        </div>
      </Link>
      <div className="post-text">
        <h2>{title}</h2>
        <p className="info">
          <span className="author">by @{username}</span>
          <time>{formatISO9075(Date(createdAt))}</time>
        </p>
        <p>{summary}</p>
      </div>
    </div>
  );
}
