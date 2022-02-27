const express = require("express");

const Product = require("../models/product.model");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const product = await Product.find().lean().exec();
    return res.status(201).send({ product });
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.get("/:category", async (req, res) => {
  try {
    const query = { category: req.params.category };
    const product = await Product.find(query).lean().exec();
    return res.send(product);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
