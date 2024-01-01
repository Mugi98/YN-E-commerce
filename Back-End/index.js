const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const nodemailer = require("nodemailer");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const path = require("path");
dotenv.config();

const productsRouter = require("./routes/Products");
const brandRouter = require("./routes/Brands");
const categoriesRouter = require("./routes/Category");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Order");
const paymentRouter = require("./routes/Payment");
const wishlistRouter = require("./routes/Wishlist");

const { User } = require("./model/user");
const { isAuth, santitizeUser, cookieExtractor } = require("./services/common");

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY;

server.use(express.json());
server.use(cors());
server.use(cors({ exposedHeaders: ["X-Total-Count"] }));
server.use(express.static(path.resolve(__dirname, "build")));
server.use(cookieParser());
server.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
server.use(passport.authenticate("session"));

server.use("/products", isAuth(), productsRouter.router);
server.use("/categories", isAuth(), categoriesRouter.router);
server.use("/brands", isAuth(), brandRouter.router);
server.use("/users", isAuth(), userRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", isAuth(), cartRouter.router);
server.use("/orders", isAuth(), orderRouter.router);
server.use("/payment", isAuth(), paymentRouter.router);
server.use("/wishlist", isAuth(), wishlistRouter.router);

passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email }).exec();
      if (!user) {
        done(null, false, { message: "No such user found" });
      } else {
        crypto.pbkdf2(
          password,
          user?.salt,
          31000,
          32,
          "sha256",
          async function (err, hashedPassword) {
            if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
              return done(null, false, {
                message: "Invalid Credentails",
              });
            } else {
              const token = jwt.sign(
                santitizeUser(user),
                process.env.JWT_SECRET_KEY
              );
              return done(null, { id: user.id, role: user.role, token });
            }
          }
        );
      }
    } catch (error) {
      done(error);
    }
  })
);

passport.use(
  "jwt-passport",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, santitizeUser(user));
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.serializeUser(async function (user, cb) {
  process.nextTick(async function () {
    return await cb(null, { id: user?.id, role: user?.role });
  });
});

passport.deserializeUser(async function (user, cb) {
  process.nextTick(async function () {
    return await cb(null, user);
  });
});

main().catch((err) => console.log(err));

async function main() {
  mongoose.connect(process.env.MONGODB_URI);
  console.log("Database Connected !");
}

server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.listen(process.env.PORT, () => {
  console.log("Server Started !");
});
