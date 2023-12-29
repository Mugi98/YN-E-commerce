const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  checkAuth,
  resetPasswordRequest,
  resetPassword,
} = require("../controller/Auth");
const passport = require("passport");

const router = express.Router();
router
  .post("/signup", createUser)
  .post("/reset-password-request", resetPasswordRequest)
  .post("/reset-password", resetPassword)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/logout", logoutUser)
  .get("/check", passport.authenticate("jwt-passport"), checkAuth);

exports.router = router;
