const express = require("express");
const {
  paymentVerification,
  getKey,
  checkout,
  fetchUserPaymentDetails,
} = require("../controller/Payment");

const router = express.Router();

router
  .post("/checkout", checkout)
  .post("/paymentverification", paymentVerification)
  .get("/", fetchUserPaymentDetails)
  .get("/getKey", getKey);

exports.router = router;
