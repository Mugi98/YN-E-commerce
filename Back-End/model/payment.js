const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new mongoose.Schema(
  {
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
    cardDetails: { type: Object },
  },
  { timestamps: true }
);

const virtual = paymentSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
paymentSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.payments = mongoose.model("payments", paymentSchema);
