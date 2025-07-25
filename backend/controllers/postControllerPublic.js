import prisma from "../prisma/client.js";

const getAllPublishedPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    where: {
      published_status: true,
    },
  });
  res.json({ posts });
};

const getIndividualPost = async (req, res) => {
  const { postId } = req.params;
  res.json({ message: `Single Post ${postId}` });
};

const getAllPostComments = async (req, res) => {
  const { postId } = req.params;
  res.json({ message: `All Post ${postId} comments` });
};

const getIndividualComment = async (req, res) => {
  const { postId, commentId } = req.params;
  res.json({ message: `Post ${postId} Comment ${commentId}` });
};

const createComment = async (req, res) => {
  const { postId } = req.params;
  res.json({ message: `Created new comment on post ${postId}` });
};

const createCommentReply = async (req, res) => {
  const { postId, commentId } = req.params;
  res.json({ message: `replied to comment ${commentId}` });
};

export default {
  getAllPublishedPosts,
  getIndividualPost,
  getAllPostComments,
  getIndividualComment,
  createComment,
  createCommentReply,
};
