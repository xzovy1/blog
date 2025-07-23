import express, { urlencoded } from "express";
import routes from "./routes/index.js";
import cors from "cors";
import "dotenv/config";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(urlencoded({ extended: true }));

app.use("/api/login", (req, res) => {
  //add passport login instead
  const user = {
    id: 1,
    username: "caleb",
  };

  jwt.sign({ user }, process.env.JWT_KEY, (err, token) => {
    //save token to localStorage here.
    res.json({
      token,
    });
  });
});
app.use("/api/posts", routes.postRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
