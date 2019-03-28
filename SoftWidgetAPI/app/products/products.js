const { Product } = require("./product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.send({
      status: true,
      message: "Products fetch successful!",
      data: products
    });
  } catch (err) {
    res.send({
      status: false,
      message: "Products fetch unsuccessful!",
      data: err
    });
  }
};

exports.getProducts = getProducts;
