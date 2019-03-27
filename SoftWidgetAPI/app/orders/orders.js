const createOrder = async (req, res) => {
  const data = req.body;

  res.send("Order Placed Successfully!");
};

const getOrder = async (req, res, id) => {
  const orders = [];

  res.send({
    total: orders.length,
    data: orders
  });
};

const updateOrder = async (req, res, id) => {
  res.send("Order Updated Successfully!");
}

const deleteOrder = async (req, res, id) => {
  res.send("Order Deleted Successfully!");
}

module.exports = { 
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder
};
