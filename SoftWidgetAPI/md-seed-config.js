
const mongoURL = process.env.MONGO_URL || "mongodb://root:$123456root@ds125526.mlab.com:25526/htm-softwidgetapi-dev";

// always push mongo connection string in env var
process.env.MONGO_URL = mongoURL;

const mongooseLib = require("mongoose"),
  ordersSeeder = require("./seeders/orders.seeder"),
  productsSeeder = require("./seeders/products.seeder");

mongooseLib.Promise = global.Promise || Promise;

module.exports = {
  // Export the mongoose lib
  mongoose: mongooseLib,

  // Export the mongodb url
  mongoURL: process.env.MONGO_URL,

  /*
    Seeders List
    ------
    order is important
  */
  seedersList: {
    productsSeeder,
    ordersSeeder
  }
};
