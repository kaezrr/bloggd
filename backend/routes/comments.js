import { Router } from "express";
import { checkUser } from "../controllers/auth";
import { createComment, getComments } from "../controllers/comments";

const comment = Router({ mergeParams: true });

comment.get("/", getComments);
comment.post("/", createComment);

comment.delete("/:commentId", checkUser, deleteComment);

export default comment;
