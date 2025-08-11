import express, { urlencoded } from "express";
import routes from "./routes/index.js";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://blog-g0g.pages.dev/"
  );
  next();
});
app.use("/api/posts", routes.postRouter);
app.use("/", routes.loginRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
