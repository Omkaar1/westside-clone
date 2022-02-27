const express = require("express");

const connect = require("./configs/db");

const productController = require("./controllers/product.controller");

const app = express();
app.use(express.json());

app.use("/product", productController);

app.listen(process.env.PORT || 2654, async () => {
  try {
    await connect();
    console.log("listening on port 2654");
  } catch (e) {
    console.log(e.message);
  }
});
