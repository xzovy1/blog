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
  "/:postId/:commentId",
  postControllerPublic.getIndividualComment
);
postRouter.post("/:postId/:commentId", postControllerPublic.createCommentReply);

//Protected Routes

//refactor both middleware. postRouter.use(addTokenToHeader, verifyToken)?
const verifyToken = (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    // console.log(authData);
    if (err) res.sendStatus(403);
    else {
      next();
    }
  });
};

const addTokenToHeader = (req, res, next) => {
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

postRouter.get(
  "/",
  addTokenToHeader,
  verifyToken,
  postControllerPrivate.getAllPosts
);
postRouter.post(
  "/",
  addTokenToHeader,
  verifyToken,
  postControllerPrivate.createBlogPost
);
postRouter.put(
  "/:postId",
  addTokenToHeader,
  verifyToken,
  postControllerPrivate.updateBlogPost
);
postRouter.delete(
  "/:postId",
  addTokenToHeader,
  verifyToken,
  postControllerPrivate.deleteBlogPost
);

postRouter.put(
  "/:postId/:commentId",
  addTokenToHeader,
  verifyToken,
  postControllerPrivate.updateBlogPostComment
);
postRouter.delete(
  "/:postId/:commentId",
  addTokenToHeader,
  verifyToken,
  postControllerPrivate.deleteBlogPostComment
);

export default postRouter;
