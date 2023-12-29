const express = require("express");
const { payments } = require("../model/payment");
const crypto = require("crypto");
const { instance } = require("../services/common");
const { Order } = require("../model/order");
const axios = require("axios");

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

exports.fetchUserPaymentDetails = async (req, res) => {
  const paymentId = req.query.paymentID;
  const key = process.env.KEY;
  const secret = process.env.SECRET;
  const credentials = `${key}:${secret}`;
  const base64Credentials = Buffer.from(credentials).toString("base64");

  const headers = {
    Authorization: `Basic ${base64Credentials}`,
  };
  const apiUrl = `https://api.razorpay.com/v1/payments/${paymentId}`;

  try {
    const response = await axios.get(apiUrl, { headers });
    const orderId = req.query.orderID;
    const updatedOrder = await payments.findByIdAndUpdate(
      orderId,
      { $set: { cardDetails: response.data.card } },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: "Internal Server Error" });
  }
};

exports.getKey = async (req, res) => {
  return res.status(200).json({ key: process.env.KEY });
};
