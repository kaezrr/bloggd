import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const logIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const sendData = Object.fromEntries(formData.entries());

    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify(sendData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.message);
      return;
    }
    localStorage.setItem("token", data.data);
    return navigate("/");
  };

  return (
    <form onSubmit={logIn} className="login-form">
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button>Log In</button>
      {error && <p>{error}</p>}
    </form>
  );
}
