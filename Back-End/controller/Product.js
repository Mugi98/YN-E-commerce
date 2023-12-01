const { Product } = require("../model/product");

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const response = await product.save();
    res.status(201).json(response);
    console.log(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchAllProducts = async (req, res) => {
  let query = Product.find({});
  let totalProductsQuery = Product.find({});

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
    totalProductsQuery = totalProductsQuery.sort({
      [req.query._sort]: req.query._order,
    });
  }
  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.sort({
      [req.query._sort]: req.query._order,
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.sort({
      [req.query._sort]: req.query._order,
    });
  }
  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  const totalDocs = await totalProductsQuery.count().exec();
  console.log({ totalDocs });

  try {
    const response = await query.exec();
    res.set("X-Total-Cont", totalDocs);
    res.status(200).json(response);
    console.log(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const product = await Product.findById(id);
    console.log(product);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(product);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
