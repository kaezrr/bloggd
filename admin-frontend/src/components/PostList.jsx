import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import Loading from "./Loading";

export function PostList() {
  let [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/posts/all", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then(async (response) => {
      setPosts((await response.json()).data);
    });
  }, []);

  if (posts.length === 0) {
    return <Loading />;
  }

  const deletePost = (i) => async () => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const response = await fetch(`http://localhost:3000/posts/${i}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (response.ok) {
      const newPosts = posts.filter((e) => e.id !== i);
      setPosts(newPosts);
    }
  };

  const setPublished = (i, status) => async () => {
    const response = await fetch(
      `http://localhost:3000/posts/${i}/published?status=${status}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
    if (response.ok) {
      const newPosts = posts.map((e) => {
        if (e.id === i) e.published = status;
        return e;
      });
      setPosts(newPosts);
    }
  };

  return (
    <main>
      {posts.map((e) => (
        <div className="post-card" key={e.id}>
          <Link to={`/posts/${e.id}`}>
            <h2>{e.title}</h2>
          </Link>
          <p>
            {formatDistanceToNow(new Date(e.createdAt), { addSuffix: true })}
          </p>
          <span>
            <img
              className="clickable"
              src={e.published ? "/eye-open.svg" : "/eye-closed.svg"}
              onClick={setPublished(e.id, !e.published)}
            />
            <img
              className="clickable"
              onClick={deletePost(e.id)}
              src="/trash.svg"
            />
            <span>
              <img src="clap.svg" alt="claps" />
              {e.likes}
            </span>
          </span>
        </div>
      ))}
    </main>
  );
}
