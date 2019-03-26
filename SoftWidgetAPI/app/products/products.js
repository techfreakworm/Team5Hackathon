const getProducts = async (req, res) => {
  const products = [
    { id: 1, name: "abc", price: "$23" },
    { id: 2, name: "xyz", price: "$53" }
  ];

  res.send({
    total: products.length,
    data: products
  });
};

exports.getProducts = getProducts;
