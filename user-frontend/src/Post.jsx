import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Postbar } from "./components/Postbar";

function Clap({ likes, setLikes }) {
  return (
    <div className="clap">
      <h3>Clap or leave a comment!</h3>
      <button onClick={setLikes}>
        <img src="/clap.svg" alt="claps" />
        {likes}
      </button>
    </div>
  );
}

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`).then(async (response) => {
      setPost((await response.json()).data);
    });
  }, [post]);

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

  return (
    <main className="post-container">
      <Postbar title={post.title} />
      <p className="post-text">{post.text}</p>
      <Clap likes={post.likes} setLikes={increaseLikes} />
    </main>
  );
}

export default Post;
