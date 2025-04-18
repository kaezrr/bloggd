import { Link } from "react-router-dom";

export function Postbar({ title, id }) {
  return (
    <nav>
      <Link to={`/edit/${id}`}>
        <h1>Edit</h1>
      </Link>
      <h1>{title}</h1>
      <Link to="/">
        <h1>Go Back</h1>
      </Link>
    </nav>
  );
}
