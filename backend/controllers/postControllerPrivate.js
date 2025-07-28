import prisma from "../prisma/client.js";

const getAllPosts = async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
};
const createBlogPost = async (req, res) => {
  const { title, body } = req.body;
  const post = await prisma.post.create({
    data: {
      title,
      body,
    },
  });
  res.json(post);
};
const updateBlogPost = async (req, res) => {
  const { postId } = req.params;
  const { title, body, publishedStatus } = req.body;
  let status = publishedStatus === "true";
  const post = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title,
      body,
      published_status: status,
      updated_date: new Date(),
    },
  });
  return res.json(post);
};
const deleteBlogPost = async (req, res) => {
  const { postId } = req.params;
  const post = await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  return res.json({ message: `Deleted Post ${post.title}!` });
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
