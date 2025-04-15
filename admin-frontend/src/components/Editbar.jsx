import { Link } from "react-router-dom";

export function Editbar({ title }) {
  return (
    <nav>
      <h1>{title}</h1>
      <Link to="/">
        <h1>Go Back</h1>
      </Link>
    </nav>
  );
}
