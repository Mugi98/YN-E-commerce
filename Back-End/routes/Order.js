const express = require("express");
const {
  createOrder,
  fetchOrderByUser,
  deleteOrder,
  updateOrder,
  fetchAllOrders,
  fetchUserPaymentDetails,
} = require("../controller/Order");

const router = express.Router();
//  /orders is already added in base path
router
  .post("/", createOrder)
  .get("/own/", fetchOrderByUser)
  .get("/", fetchAllOrders)
  .delete("/:id", deleteOrder)
  .patch("/:id", updateOrder);

exports.router = router;
