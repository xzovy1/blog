import express, { urlencoded } from "express";
import routes from "./routes/index.js";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(urlencoded({ extended: true }));

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL);
  next();
});

app.use("/api/posts", routes.postRouter);
app.use("/", routes.loginRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
