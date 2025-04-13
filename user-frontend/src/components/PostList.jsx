import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

export function PostList() {
  let [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/posts").then(async (response) => {
      setPosts((await response.json()).data);
    });
  }, []);
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
            <img src="clap.svg" alt="claps" />
            {e.likes}
          </span>
        </div>
      ))}
    </main>
  );
}
