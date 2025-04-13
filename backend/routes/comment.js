import { Router } from "express";

const comment = Router({ mergeParams: true });

comment.get("/");
comment.post("/");

comment.delete("/:commentId");

export default comment;
