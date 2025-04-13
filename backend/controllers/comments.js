import db from "../prisma/prisma.js";
import { body, validationResult } from "express-validator";

const validateComment = [
  body("author")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Author should not be empty!"),
  body("comment")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Comment should not be empty!"),
];

export async function getComments(req, res) {
  const { postId } = req.params;
  try {
    const comments = await db.comment.findMany({
      where: { postId: parseInt(postId), post: { published: true } },
      orderBy: { createdAt: "desc" },
    });
    return res.json({
      message: "Comments fetched successfully",
      data: comments,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}

export async function getCommentsAdmin(req, res) {
  const { postId } = req.params;
  try {
    const comments = await db.comment.findMany({
      where: { postId: parseInt(postId) },
      orderBy: { createdAt: "desc" },
    });
    return res.json({
      message: "Comments fetched successfully",
      data: comments,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}

export const createComment = [
  validateComment,
  async (req, res) => {
    const { postId } = req.params;
    const { email, comment } = req.body;
    try {
      const post = await db.post.findFirst({
        where: { id: parseInt(postId), published: true },
      });
      if (!post) {
        throw new Error("Post not found");
      }
      const resource = await db.comment.create({
        data: { author: email, text: comment, postId: parseInt(postId) },
      });
      return res.status(201).json({
        message: "Comment created successfully",
        data: resource,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },
];

export async function createCommentAdmin(req, res) {
  const { postId } = req.params;
  const { author, comment } = req.body;
  try {
    const post = await db.post.findFirst({
      where: { id: parseInt(postId) },
    });
    if (!post) {
      throw new Error("Post not found");
    }
    const resource = await db.comment.create({
      data: { author, text: comment, postId: parseInt(postId) },
    });
    return res.status(201).json({
      message: "Comment created successfully",
      data: resource,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}

export async function deleteComment(req, res) {
  const { commentId } = req.params;
  try {
    await db.comment.delete({ where: { id: parseInt(commentId) } });
    return res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}
