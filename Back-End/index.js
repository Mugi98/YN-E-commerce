const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
dotenv.config();

const productsRouter = require("./routes/Products");
const brandRouter = require("./routes/Brands");
const categoriesRouter = require("./routes/Category");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Order");
const paymentRouter = require("./routes/Payment");

const { User } = require("./model/user");
const { isAuth, santitizeUser, cookieExtractor } = require("./services/common");

const SECRET_KEY = "SECRET_KEY";
// const stripe = require("stripe")(
//   "sk_test_51OQuAgSBxJ90nxsuZyC5OACPciyOz1GfVhCEF8hI3YGAA3a6fNd94gUeGG2Y9lU8KJTmIoGBgruEn5wKkAsKuzVV009jEKVrK9"
// );

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;

server.use(express.json());
server.use(cors());
server.use(cors({ exposedHeaders: ["X-Total-Count"] }));
server.use(express.static("build"));
server.use(cookieParser());
server.use(
  session({
    secret: "keyboard cat",
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
      }
      crypto.pbkdf2(
        password,
        user.salt,
        31000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "Invalid Credentails" });
          } else {
            const token = jwt.sign(santitizeUser(user), SECRET_KEY);
            return done(null, { id: user.id, role: user.role, token });
          }
        }
      );
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

// Payments

main().catch((err) => console.log(err));

async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("Database Connected !");
}

server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.listen(8080, () => {
  console.log("Server Started !");
});
