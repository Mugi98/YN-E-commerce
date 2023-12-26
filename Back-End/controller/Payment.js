const express = require("express");
const { payments } = require("../model/payment");
const crypto = require("crypto");
const { instance } = require("../services/common");
const { createOrder } = require("./Order");

const router = express.Router();

exports.checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.totalAmount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};
exports.paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.SECRET)
    .update(body.toString())
    .digest("hex");
  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    const response = await payments.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    return res.status(200).json({ response });
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

exports.getKey = async (req, res) => {
  return res.status(200).json({ key: process.env.KEY });
};
