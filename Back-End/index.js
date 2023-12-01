const express = require("express");
const server = express();
const mongoose = require("mongoose");
const productsRouter = require("./routes/Products");
const brandRouter = require("./routes/Brands");
const categoriesRouter = require("./routes/Category");

server.use(express.json());

server.use("/products", productsRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/brands", brandRouter.router);

main().catch((err) => console.log(err));

async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("Database Connected !");
}

server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.listen(8080, () => {
  console.log("Server Started !");
});
