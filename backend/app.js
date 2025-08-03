import express, { urlencoded } from "express";
import routes from "./routes/index.js";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(urlencoded({ extended: true }));

app.use("/api/posts", routes.postRouter);
app.use("/login", routes.loginRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
