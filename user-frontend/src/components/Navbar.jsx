import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav>
      <span>
        <h1>View posts on&nbsp;</h1>
        <Link to="/">
          <h1>Bloggd</h1>
        </Link>
      </span>
    </nav>
  );
}
