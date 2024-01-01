const express = require("express");
const {
  addToWishlist,
  fetchWishlistByUser,
  deleteFromWishlist,
} = require("../controller/Wishlist");

const router = express.Router();

router
  .post("/", addToWishlist)
  .get("/own", fetchWishlistByUser)
  .delete("/:id", deleteFromWishlist);

exports.router = router;
