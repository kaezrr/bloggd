import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import Loading from "./Loading";

export function CommentList({ postId }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  let [comments, setComments] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/posts/${postId}/comments/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then(async (response) => {
      setComments((await response.json()).data);
    });
  }, []);

  const deleteComment = (i) => async () => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const response = await fetch(`${apiUrl}/posts/${postId}/comments/${i}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (response.ok) {
      const newComments = comments.filter((e) => e.id !== i);
      setComments(newComments);
    }
  };

  return (
    <div className="comment-holder">
      {comments.length === 0 && <h2>There aren't any comments here yet...</h2>}
      {comments.map((e) => (
        <div className="comment-card" key={e.id}>
          <h3>{e.author}</h3>
          <p>
            {formatDistanceToNow(new Date(e.createdAt), { addSuffix: true })}
            &nbsp;
            <img
              className="clickable"
              onClick={deleteComment(e.id)}
              src="/trash.svg"
            />
          </p>
          <p>{e.text}</p>
        </div>
      ))}
    </div>
  );
}
