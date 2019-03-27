const { Product } = require("./product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.send({
      status: true,
      msg: "Products fetch successful!",
      data: products
    });
  } catch (err) {
    res.send({
      status: false,
      msg: "Products fetch unsuccessful!",
      data: err
    });
  }
};

exports.getProducts = getProducts;
