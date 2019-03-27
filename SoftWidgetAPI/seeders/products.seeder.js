const { Seeder } = require("mongoose-data-seed"),
  { Product } = require("../app/products/product");

const data = [
  {
    name: "SWGen2dx",
    price: 30,
    sku: "",
    description: `The SWGen2dx (conveniently the product SKU) is a revolutionary house-hold product everyone wants. It features a sleek casing with intuitive features.
    Features include: 
    Rock-solid audio engagement
    Silver-bullet touch response system 
    Long lasting rechargeable battery `,
    type: "house-hold"
  }
];

const ProductsSeeder = Seeder.extend({
  shouldRun: function() {
    return Product.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    return Product.create(data);
  }
});

module.exports = ProductsSeeder;
