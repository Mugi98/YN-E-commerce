const express = require("express");
const {
  paymentVerification,
  getKey,
  checkout,
} = require("../controller/Payment");

const router = express.Router();

router
  .post("/checkout", checkout)
  .post("/paymentverification", paymentVerification)
  .get("/getKey", getKey);

exports.router = router;
