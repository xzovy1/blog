import jwt from "jsonwebtoken";
import prisma from "../prisma/client.js";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          name: username,
        },
      });
      if (!user) {
        console.log("incorrect username");
        return done(null, false, { message: "Incorrect Username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log("incorrect password");
        return done(null, false, { message: "Incorrect Password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

const login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.json({ message: "Incorrect Username or Password" });

    jwt.sign({ user }, process.env.JWT_KEY, (err, token) => {
      //save token to localStorage.
      res.json({
        token,
      });
    });
  })(req, res, next);
};

export default { login };
