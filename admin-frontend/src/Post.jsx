import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Postbar } from "./components/Postbar";
import { CommentList } from "./components/CommentList";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/posts/all/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then(async (response) => {
      setPost((await response.json()).data);
    });
  }, []);

  return (
    <main className="post-container">
      <Postbar title={post.title} />
      <p className="post-text">{post.text}</p>
      <CommentList postId={id} />
    </main>
  );
}

export default Post;
