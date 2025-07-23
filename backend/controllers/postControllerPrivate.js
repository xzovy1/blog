import prisma from "../prisma/client.js";
import jwt from "jsonwebtoken";

function verifyToken(req, res, message) {
  jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    console.log(authData);
    if (err) res.sendStatus(403);
    else {
      res.json(message, authData);
    }
  });
}

const createBlogPost = async (req, res) => {
  verifyToken(req, res, { message: "Created new Post!" });
};
const updateBlogPost = async (req, res) => {
  const { postId } = req.params;
  return res.json({ message: `Updated Post ${postId}!` });
};
const deleteBlogPost = async (req, res) => {
  const { postId } = req.params;
  return res.json({ message: `Deleted Post ${postId}!` });
};
const updateBlogPostComment = async (req, res) => {
  const { postId, commentId } = req.params;
  return res.json({ message: `Updated Post ${postId} comment ${commentId}!` });
};
const deleteBlogPostComment = async (req, res) => {
  const { postId, commentId } = req.params;
  return res.json({ message: `Updated Post ${postId} comment ${commentId}!` });
};

export default {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  updateBlogPostComment,
  deleteBlogPostComment,
};
