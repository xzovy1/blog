import prisma from "../prisma/client.js";

const getAllPosts = async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json({ posts });
};
const createBlogPost = async (req, res) => {
  const { title, body } = req.body;
  const post = await prisma.post.create({
    data: {
      title,
      body,
    },
  });
  res.json({ post });
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
  getAllPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  updateBlogPostComment,
  deleteBlogPostComment,
};
