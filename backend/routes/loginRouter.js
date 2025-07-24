import { Router } from "express";
import loginController from "../controllers/loginController.js";

const loginRouter = Router();

// /api/login
loginRouter.post("/", loginController.login);

export default loginRouter;
