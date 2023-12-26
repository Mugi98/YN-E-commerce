const passport = require("passport");
const Razorpay = require("razorpay");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt-passport");
};

exports.santitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt-passport"];
  }
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODZiYWM1M2I5MTU5YzA1MjA1NTEzZiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzAzNTI5OTI2fQ.SGGOwVnwquFsbhMoV-_DWVgjqENqHwYaI1WWhYDtZzA";
  return token;
};

exports.instance = new Razorpay({
  key_id: process.env.KEY,
  key_secret: process.env.SECRET,
});
