import { useState } from "react";
import "./styles/App.css";
import { Navbar } from "./components/Navbar";
import { PostList } from "./components/PostList";

function App() {
  return (
    <>
      <Navbar />
      <PostList />
    </>
  );
}

export default App;
