import jwt from "jsonwebtoken";
import prisma from "../prisma/client.js";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.author.findUnique({
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
  passport.authenticate(
    "local",
    { failureRedirect: "/login", successRedirect: "/posts" },
    (err, user, info) => {
      console.log(info);
      if (err) return next(err);
      if (!user) return res.json({ message: "Incorrect Username or Password" });
      jwt.sign(
        { user },
        process.env.JWT_KEY,
        { expiresIn: "1d" },
        (err, token) => {
          // console.log(token);
          res.json({
            token,
          });
        }
      );
      req.app.locals.logout = req.logout;
    }
  )(req, res, next);
};

const logout = async (req, res, next) => {
  req.app.locals.logout((err) => {
    if (err) return next(err);

    res.send({ message: "logged out" });
  });
};

export default { login, logout };
