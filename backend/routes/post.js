import { Router } from "express";

const post = Router();

post.get("/");
post.get("/:postId");

post.post("/");
post.put("/:postId");
post.delete("/:postId");

export default post;
