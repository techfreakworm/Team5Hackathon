const { Seeder } = require("mongoose-data-seed"),
  { Order } = require("../app/orders/order");

const data = [
  {
    shippingAddress: {
      address1: "3230 Reagenea Dr",
      address2: "",
      state: "Dallas",
      zip: 75098
    },
    billingAddress: {
      address1: "3230 Reagenea Dr",
      address2: "",
      state: "Dallas",
      zip: 75098
    },
    salesTax: "8.25",
    shippingMethod: "FREE",
    state: "pending",
    paymentMethod: "COD",
    quantity: 5,
    customer: {
      firstName: "Dummy",
      lastName: "Test",
      email: "dummyTest@testmail.com",
      phoneNumber: "720-448-8227"
    }
  }
];

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
