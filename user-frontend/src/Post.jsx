import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Postbar } from "./components/Postbar";
import { CommentList } from "./components/CommentList";
import { Clap } from "./components/Clap";
import { FormSummoner } from "./components/FormSummoner";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`).then(async (response) => {
      setPost((await response.json()).data);
    });
  }, [refresh]);

  const increaseLikes = async () => {
    await fetch(`http://localhost:3000/posts/${id}/likes`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    setPost((prevPost) => ({
      ...post,
      likes: prevPost.likes + 1,
    }));
  };

  const refreshComments = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <main className="post-container">
      <Postbar title={post.title} />
      <p className="post-text">{post.text}</p>
      <div className="btn-containers">
        <Clap likes={post.likes} setLikes={increaseLikes} />
        <h2>or</h2>
        <FormSummoner postId={id} onSubmitSuccess={refreshComments} />
      </div>
      <CommentList postId={id} refresh={refresh} />
    </main>
  );
}

export default Post;
