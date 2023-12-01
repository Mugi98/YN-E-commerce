const express = require("express");
const { fetchCategories, createCategory } = require("../controller/Category");

const router = express.Router();

router.post("/", createCategory).get("/", fetchCategories);

exports.router = router;
