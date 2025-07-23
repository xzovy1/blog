import { Router } from "express";
import postControllerPublic from "../controllers/postControllerPublic.js";
import postControllerPrivate from "../controllers/postControllerPrivate.js";

const postRouter = Router();

//Public Routes
postRouter.get("/", postControllerPublic.getAllPosts);
postRouter.get("/:postId", postControllerPublic.getIndividualPost);

postRouter.get("/:postId/comments", postControllerPublic.getAllPostComments);
postRouter.post("/:postId/comments", postControllerPublic.createComment);

postRouter.get(
  "/:postId/:commentId",
  postControllerPublic.getIndividualComment
);
postRouter.post("/:postId/:commentId", postControllerPublic.createCommentReply);

//Protected Routes

const addTokenToHeader = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
  } else {
    res.sendStatus(403);
  }
  next();
};

postRouter.post("/", addTokenToHeader, postControllerPrivate.createBlogPost);
postRouter.put(
  "/:postId",
  addTokenToHeader,
  postControllerPrivate.updateBlogPost
);
postRouter.delete(
  "/:postId",
  addTokenToHeader,
  postControllerPrivate.deleteBlogPost
);

postRouter.put(
  "/:postId/:commentId",
  addTokenToHeader,
  postControllerPrivate.updateBlogPostComment
);
postRouter.delete(
  "/:postId/:commentId",
  addTokenToHeader,
  postControllerPrivate.deleteBlogPostComment
);

export default postRouter;
