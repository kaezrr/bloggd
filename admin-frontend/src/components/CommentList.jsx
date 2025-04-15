import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

export function CommentList({ postId, refresh }) {
  let [comments, setComments] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/posts/${postId}/comments`).then(
      async (response) => {
        setComments((await response.json()).data);
      },
    );
  }, [refresh]);
  return (
    <div className="comment-holder">
      {comments.map((e) => (
        <div className="comment-card" key={e.id}>
          <h3>{e.author}</h3>
          <p>
            {formatDistanceToNow(new Date(e.createdAt), { addSuffix: true })}
          </p>
          <p>{e.text}</p>
        </div>
      ))}
    </div>
  );
}
