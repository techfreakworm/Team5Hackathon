const { Seeder } = require("mongoose-data-seed"),
  { Order } = require("../app/orders/order");

const data = [{
  shippingAddress: {
    address1: "3230 Reagenea Dr",
    address2: "3230 Reagenea Dr",
    state: "Dallas",
    zip: 75098
  },
  billingAddress: {
    address1: "3230 Reagenea Dr",
    address2: "3230 Reagenea Dr",
    state: "Dallas",
    zip: 75098
  }
}];

const OrdersSeeder = Seeder.extend({
  shouldRun: function() {
    return Order.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    return Order.create(data);
  }
});

module.exports = OrdersSeeder;
