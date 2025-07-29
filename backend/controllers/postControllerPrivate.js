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
  const { title, body } = req.body;
  const updateComment = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      body: "This comment was redacted by the author of the page",
      author_name: "redacted",
    },
  });
  return res.json(updateComment);
};
const deleteBlogPostComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const deleteComment = await prisma.comment.delete({
    where: {
      id: commentId,
    },
    include: {
      post: true,
    },
  });
  console.log(`comment deleted on ${deleteComment.post.title}`);
  return res.json(deleteComment);
};

export default {
  getAllPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  updateBlogPostComment,
  deleteBlogPostComment,
};
