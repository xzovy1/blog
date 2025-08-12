import express, { urlencoded } from "express";
import routes from "./routes/index.js";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(urlencoded({ extended: true }));

const AUTHOR_URL = process.env.AUTHOR_URL || "http://localhost:5173";
const VISITOR_URL = process.env.VISITOR_URL || "http://localhost:5173";
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api/posts", routes.postRouter);
app.use("/", routes.loginRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
