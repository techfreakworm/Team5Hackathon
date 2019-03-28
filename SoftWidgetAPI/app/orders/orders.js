var ObjectId = require("mongoose").Types.ObjectId;

const { Order } = require("./order");

const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const order = new Order(orderData);
    order.productId = orderData.productId;

    const result = await Order.create(order);

    sendResponse(res, true, "Order Created Successfully!", result);
  } catch (err) {
    sendResponse(res, false, "Order Create Unsuccessful!", err);
  }
};

const getOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.find({
      _id: id
    }).populate("product");

    if (order[0].isDeleted) {
      const deletedAtDate = new Date(order[0].deletedAt),
        message = `Order Deleted by you on ${deletedAtDate}!`;

      sendResponse(res, true, message, order);
    }

    sendResponse(res, true, "Order Fetched Successfully!", order);
  } catch (err) {
    sendResponse(res, false, "Order Fetch Unsuccessful!", err);
  }
};

const updateOrder = async (req, res) => {
  try {
    const id = req.params.id,
      updateOrderData = req.body;

    const result = await Order.findByIdAndUpdate(
      id,
      { $set: updateOrderData },
      { new: true }
    );

    sendResponse(res, true, "Order Updated Successfully!", result);
  } catch (err) {
    sendResponse(res, false, "Order Update Unsuccessful!", err);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Order.findByIdAndUpdate(
      id,
      {
        $set: {
          isDeleted: true,
          deletedAt: new Date().toISOString()
        }
      },
      { new: true }
    );

    sendResponse(res, true, "Order Deleted Successfully!", result);
  } catch (err) {
    sendResponse(res, false, "Order Delete Unsuccessful!", err);
  }
};

const sendResponse = async (res, status, message, resultOrErr) => {
  res.send({
    status: status,
    message: message,
    data: resultOrErr
  });
};

module.exports = {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder
};
