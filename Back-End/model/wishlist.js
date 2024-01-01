const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishlistSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const virtual = wishlistSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
wishlistSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Wishlist = mongoose.model("Wishlist", wishlistSchema);
