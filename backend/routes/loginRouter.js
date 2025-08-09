import { Router } from "express";
import loginController from "../controllers/loginController.js";

const loginRouter = Router();

// /api/login
loginRouter.get("/login", (req, res) => {
  res.json({ message: "login" });
});
loginRouter.post("/login", loginController.login);
loginRouter.get("/logout", loginController.logout);

export default loginRouter;
