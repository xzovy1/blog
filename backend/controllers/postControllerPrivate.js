import prisma from "../prisma/client.js";

const createBlogPost = async (req, res) => {
  return res.json({ message: "Created new Post!" });
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
