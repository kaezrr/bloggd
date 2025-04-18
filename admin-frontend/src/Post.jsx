import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Postbar } from "./components/Postbar";
import { CommentList } from "./components/CommentList";
import Loading from "./components/Loading";

function Post() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(`${apiUrl}/posts/all/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then(async (response) => {
      setPost((await response.json()).data);
    });
  }, []);

  if (Object.keys(post).length === 0) {
    return <Loading />;
  }

  return (
    <main className="post-container">
      <Postbar title={post.title} id={id} />
      <div
        className="post-text"
        dangerouslySetInnerHTML={{ __html: post.text }}
      ></div>
      <CommentList postId={id} />
    </main>
  );
}

export default Post;
