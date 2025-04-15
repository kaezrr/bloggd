import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";
import App from "./App.jsx";
import Post from "./Post.jsx";
import Login from "./Login.jsx";
import Protected from "./Protected.jsx";
import PostForm from "./PostForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <App />
      </Protected>
    ),
  },
  {
    path: "/posts/:id",
    element: (
      <Protected>
        <Post />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/edit/:id",
    element: (
      <Protected>
        <PostForm />
      </Protected>
    ),
  },
  {
    path: "/create",
    element: (
      <Protected>
        <PostForm />
      </Protected>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
