const express = require("express");
const { fetchBrands, createBrands } = require("../controller/Brand");

const router = express.Router();

router.post("/", createBrands).get("/", fetchBrands);

exports.router = router;
