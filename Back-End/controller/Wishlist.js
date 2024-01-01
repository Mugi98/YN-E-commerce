const { Wishlist } = require("../model/wishlist");

exports.fetchWishlistByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const wishlistItems = await Wishlist.find({ user: id })
      .populate("user")
      .populate("product");
    res.status(200).json(wishlistItems);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.addToWishlist = async (req, res) => {
  const { id } = req.user;
  const wishlist = new Wishlist({ ...req.body, user: id });
  try {
    const response = await wishlist.save();
    const result = await response.populate("product");
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deleteFromWishlist = async (req, res) => {
  const { id } = req.params;
  console.log(id, "IDJKK");
  try {
    const response = await Wishlist.findByIdAndDelete(id);
    console.log(response, "RESPONSE");
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateWishlist = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const result = await cart.populate("product");
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};
