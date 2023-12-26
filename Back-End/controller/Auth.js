const { User } = require("../model/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { santitizeUser } = require("../services/common");

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

exports.checkAuth = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};
