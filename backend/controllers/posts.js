import db from "../prisma/prisma.js";
import { body, validationResult } from "express-validator";

const validatePost = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Title must be 1-50 characters"),
  body("text").trim().isLength({ min: 1 }).withMessage("Body cannot be empty"),
  body("published").trim().isBoolean().withMessage("Invalid published status"),
];

export async function getPosts(req, res) {
  try {
    const posts = await db.post.findMany({
      where: { published: true },
    });
    res.json({
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

export async function getPostsAdmin(req, res) {
  try {
    const posts = await db.post.findMany();
    res.json({
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

export async function viewPost(req, res) {
  const { postId } = req.params;
  try {
    const post = await db.post.findUnique({
      where: { id: parseInt(postId), published: true },
    });
    if (!post) {
      return res.status(404).json({
        message: "Post doesn't exist",
        data: null,
      });
    }
    res.json({
      message: "Post fetched successfully",
      data: post,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

export async function viewPostAdmin(req, res) {
  const { postId } = req.params;
  try {
    const post = await db.post.findUnique({
      where: { id: parseInt(postId) },
    });
    if (!post) {
      return res.status(404).json({
        message: "Post doesn't exist",
        data: null,
      });
    }
    res.json({
      message: "Post fetched successfully",
      data: post,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

export const createPost = [
  validatePost,
  async (req, res) => {
    const { title, text, published } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json(errors.array());
    }
    try {
      const post = await db.post.create({
        data: { title, text, authorId: req.user.id, published },
      });
      res.status(201).json({
        message: "Post created successfully",
        data: post,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
];

export const updatePost = [
  validatePost,
  async (req, res) => {
    const { postId } = req.params;
    const { title, text, published } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json(errors.array());
    }
    try {
      const post = await db.post.update({
        where: { id: parseInt(postId) },
        data: { title, text, published },
      });
      res.json({
        message: "Post updated successfully",
        data: post,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
];

export async function deletePost(req, res) {
  const { postId } = req.params;
  try {
    await db.post.delete({ where: { id: parseInt(postId) } });
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

export async function increaseLikes(req, res) {
  const { postId } = req.params;
  try {
    const post = await db.post.update({
      where: { id: parseInt(postId) },
      data: { likes: { increment: 1 } },
    });
    res.json({
      message: "Post likes updated successfully",
      data: post,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}
