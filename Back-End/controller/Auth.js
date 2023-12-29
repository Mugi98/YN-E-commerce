const { User } = require("../model/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { santitizeUser, sendMail } = require("../services/common");

const SECRET_KEY = "SECRET_KEY";

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      31000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const response = await user.save();
        req.login(santitizeUser(response), (err) => {
          if (err) {
            res.status(400).json(error);
          } else {
            const token = jwt.sign(santitizeUser(response), SECRET_KEY);
            res.cookie("jwt-passport", token, {
              expires: new Date(Date.now() + 3600000),
              httpOnly: true,
            });
            res.status(201).json({ id: user.id, role: user.role });
          }
        });
      }
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  const user = req.user;
  res
    .cookie("jwt-passport", user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json(req.user.token);
};

exports.logoutUser = async (req, res) => {
  const user = req.user;
  res
    .cookie("jwt-passport", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .sendStatus(200);
};

exports.checkAuth = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};

exports.resetPasswordRequest = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (user) {
    const randomToken = crypto.randomBytes(48).toString("hex");
    user.resetPasswordToken = randomToken;
    await user?.save();
    const resetPageLink =
      "http://localhost:8080/reset-password?token=" +
      randomToken +
      "&email=" +
      email;
    const subject = "Reset passwword for YN-Ecommerce";
    const html = `<p>Click <a href=${resetPageLink}>here</a> to reset you password.</p>`;
    if (email) {
      const response = await sendMail({ to: email, subject, html });
      res.status(200).json(response);
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400).json({ message: "User Not Found" });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, password, token } = req.body;
  const user = await User.findOne({ email: email, resetPasswordToken: token });
  if (user) {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      password,
      salt,
      31000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        user.password = hashedPassword;
        user.salt = salt;
        await user.save();
        const subject = "password successfully reset for e-commerce";
        const html = `<p>Successfully able to Reset Password</p>`;
        if (email) {
          const response = await sendMail({ to: email, subject, html });
          res.status(200).json(response);
        } else {
          res.sendStatus(400);
        }
      }
    );
  } else {
    res.status(400).json({ message: "User Not Found" });
  }
};
