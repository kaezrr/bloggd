import { Router } from "express";
import { checkUser } from "../controllers/auth.js";
import {
  createComment,
  deleteComment,
  getComments,
} from "../controllers/comments.js";

const comment = Router({ mergeParams: true });

comment.get("/", getComments);
comment.post("/", createComment);

comment.delete("/:commentId", checkUser, deleteComment);

export default comment;
