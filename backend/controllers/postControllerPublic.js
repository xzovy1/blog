import prisma from "../prisma/client.js";

const getAllPublishedPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    where: {
      published_status: true,
    },
  });
  res.json(posts);
};

const getIndividualPost = async (req, res) => {
  const { postId } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  res.json(post);
};

const getAllPostComments = async (req, res) => {
  const { postId } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      comments: true,
    },
  });
  if (!post.comments) res.json({ message: `${post.title} has no comments` });
  else {
    res.json(post.comments);
  }
};

const getIndividualComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });
  res.json(comment);
};

const createComment = async (req, res) => {
  const { postId } = req.params;
  const { body, author } = req.body;
  const comment = await prisma.comment.create({
    data: {
      post: {
        connect: {
          id: postId,
        },
      },
      body,
      author_name: author,
    },
    include: {
      post: true,
    },
  });
  res.json(comment);
};

const getAllCommentReplies = async (req, res) => {
  const { commentId } = req.params;
  const replies = await prisma.comment.findMany({
    where: {
      comment_id: commentId,
    },
  });
  return res.json(replies);
};

const createCommentReply = async (req, res) => {
  const { postId, commentId } = req.params;
  const { body, author } = req.body;
  const reply = await prisma.reply.create({
    data: {
      comment: {
        connect: {
          id: commentId,
        },
      },
      body,
      author_name: author,
    },
    include: {
      comment: true,
    },
  });
  res.json(reply);
};

export default {
  getAllPublishedPosts,
  getIndividualPost,
  getAllPostComments,
  getIndividualComment,
  createComment,
  getAllCommentReplies,
  createCommentReply,
};
