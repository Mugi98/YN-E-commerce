const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentschema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
});

exports.payments = mongoose.model("payments", paymentschema);
