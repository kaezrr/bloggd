import { Router } from "express";
import { checkUser } from "../controllers/auth.js";
import {
  createComment,
  createCommentAdmin,
  deleteComment,
  getComments,
  getCommentsAdmin,
} from "../controllers/comments.js";

const comment = Router({ mergeParams: true });

comment.get("/", getComments);
comment.post("/", createComment);

comment.get("/all", checkUser, getCommentsAdmin);
comment.post("/all", checkUser, createCommentAdmin);

comment.delete("/:commentId", checkUser, deleteComment);

export default comment;
