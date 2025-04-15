import { Link } from "react-router-dom";

export function Navbar() {
  const signOut = () => {
    localStorage.removeItem("token");
  };

  return (
    <nav>
      <span>
        <h1>Manage posts on&nbsp;</h1>
        <Link to="/">
          <h1>Bloggd Admin</h1>
        </Link>
      </span>
      <Link onClick={signOut} to="/login">
        <h1>Sign Out</h1>
      </Link>
    </nav>
  );
}
