import { Router } from "express";
import postControllerPublic from "../controllers/postControllerPublic.js";
import postControllerPrivate from "../controllers/postControllerPrivate.js";

const postRouter = Router();

const verifyAuth = async (req, res, next) => {
  console.log("Path verified");
  next();
};

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
postRouter.post("/", verifyAuth, postControllerPrivate.createBlogPost);
postRouter.put("/:postId", verifyAuth, postControllerPrivate.updateBlogPost);
postRouter.delete("/:postId", verifyAuth, postControllerPrivate.deleteBlogPost);

postRouter.put(
  "/:postId/:commentId",
  verifyAuth,
  postControllerPrivate.updateBlogPostComment
);
postRouter.delete(
  "/:postId/:commentId",
  verifyAuth,
  postControllerPrivate.deleteBlogPostComment
);

export default postRouter;
