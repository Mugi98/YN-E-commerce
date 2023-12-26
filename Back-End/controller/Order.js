const { Cart } = require("../model/cart");
const { Order } = require("../model/order");
const axios = require("axios");

exports.fetchAllOrders = async (req, res) => {
  let condition = {};
  if (!req.query.admin) {
    condition.deleted = { $ne: true };
  }

  let query = Order.find(condition);
  let totalOrderQuery = Order.find(condition);

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalOrderQuery.count().exec();

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchOrderByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const orders = await Order.find({ user: id }).populate("paymentByCard");
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchUserPaymentDetails = async (req, res) => {
  const paymentId = req.params.id;
  const key = process.env.KEY;
  const secret = process.env.SECRET;
  const credentials = `${key}:${secret}`;
  const base64Credentials = Buffer.from(credentials).toString("base64");

  const headers = {
    Authorization: `Basic ${base64Credentials}`,
  };
  console.log(paymentId, "PAYMENTID");
  const apiUrl = `https://api.razorpay.com/v1/payments/${paymentId}`;

  try {
    const response = await axios.get(apiUrl, { headers });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(400).json({ error: "Internal Server Error" });
    // Optionally, you might choose to throw the error to stop further execution
    // throw error;
  }
};

exports.createOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const response = await order.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Order.findByIdAndDelete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};
