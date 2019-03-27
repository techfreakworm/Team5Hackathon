const { Order } = require("./order");

const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const order = new Order(orderData);

    const result = await Order.create(order);

    sendResponse(res, true, "Order Created Successfully!", result);
  } catch (err) {
    // throw err;
    sendResponse(res, false, "Order Create Unsuccessful!", err);
  }
};

const getOrder = async (req, res, id) => {
  try {
    const orderId = req.body;
    const order = await Order.findOne({
      _id: orderId
    });

    sendResponse(res, true, "Order Fetch Successfully!", order);
  } catch (err) {
    // throw err;
    sendResponse(res, false, "Order Fetch Unsuccessful!", err);
  }
};

const updateOrder = async (req, res, id) => {
  try {
    const updateOrderData = req.body;
    const updateOrder = new Order(updateOrderData);

    const result = await Order.updateOne(
      { _id: updateOrderData._id },
      updateOrder
    );

    sendResponse(res, true, "Order Updated Successfully!", result);
  } catch (err) {
    // throw err;
    sendResponse(res, false, "Order Update Unsuccessful!", err);
  }
};

const deleteOrder = async (req, res, id) => {
  try {
    const deleteOrderData = req.body;

    const result = await Order.deleteOne({
      _id: deleteOrderData._id
    });

    sendResponse(res, true, "Order Deleted Successfully!", result);
  } catch (err) {
    // throw err;
    sendResponse(res, false, "Order Delete Unsuccessful!", err);
  }
};

const sendResponse = async (res, status, msg, resultOrErr) => {
  res.send({
    status: status,
    msg: msg,
    data: resultOrErr
  });
};

module.exports = {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder
};
