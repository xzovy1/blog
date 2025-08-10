import { Router } from "express";
import postControllerPublic from "../controllers/postControllerPublic.js";
import postControllerPrivate from "../controllers/postControllerPrivate.js";
import jwt from "jsonwebtoken";

const postRouter = Router();

//Public Routes
postRouter.get("/published", postControllerPublic.getAllPublishedPosts);
postRouter.get("/:postId", postControllerPublic.getIndividualPost);

postRouter.get("/:postId/comments", postControllerPublic.getAllPostComments);
postRouter.post("/:postId/comments", postControllerPublic.createComment);

postRouter.get(
  "/comments/:commentId",
  postControllerPublic.getIndividualComment
);
postRouter.post("/comments/:commentId", postControllerPublic.createCommentReply);
postRouter.get(
  "/comments/:commentId/replies",
  postControllerPublic.getAllCommentReplies
);

//Protected Routes
const addTokenToHeader = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
  } else {
    res.sendStatus(500);
  }
  next();
};
const verifyToken = (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      next();
    }
  });
};

postRouter.use(addTokenToHeader);
postRouter.use(verifyToken);

postRouter.get("/", postControllerPrivate.getAllPosts);
postRouter.post("/", postControllerPrivate.createBlogPost);
postRouter.put("/:postId", postControllerPrivate.updateBlogPost);
postRouter.delete("/:postId", postControllerPrivate.deleteBlogPost);
postRouter.delete(
  "/replies/:replyId",
  postControllerPrivate.deleteBlogPostReply
)

postRouter.put(
  "/:postId/:commentId",
  postControllerPrivate.updateBlogPostComment
);
postRouter.delete(
  "/:postId/:commentId",
  postControllerPrivate.deleteBlogPostComment
);


export default postRouter;
