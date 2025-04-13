import { Router } from "express";
import { checkUser } from "../controllers/auth.js";
import {
  createPost,
  deletePost,
  getPosts,
  getPostsAdmin,
  increaseLikes,
  updatePost,
  viewPost,
  viewPostAdmin,
} from "../controllers/posts.js";

const post = Router();

post.get("/all", checkUser, getPostsAdmin);
post.get("/all/:postId", checkUser, viewPostAdmin);

post.get("/", getPosts);
post.get("/:postId", viewPost);
post.put("/:postId/likes", increaseLikes);

post.post("/", checkUser, createPost);
post.put("/:postId", checkUser, updatePost);
post.delete("/:postId", checkUser, deletePost);

export default post;
