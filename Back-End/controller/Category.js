const { Category } = require("../model/category");

exports.fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    const response = await category.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
