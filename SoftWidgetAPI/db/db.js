const mongoose = require("mongoose"),
  blueBird = require("bluebird");

switch (process.env.NODE_ENV) {
  case "test":
    mongooseConnectTest(process.env.MONGO_URL_Test);
    break;
  default:
    mongooseConnectProdOrDev(process.env.MONGO_URL);
    break;
}

async function mongooseConnectProdOrDev(dbUrl) {
  try {
    const authData = {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PWD,
      dbName: process.env.MONGO_DB,
      useNewUrlParser: true,
      useCreateIndex: true
    };

    const client = await mongoose.connect(dbUrl, authData);

    if (client) console.log("Connected to Mongo...");
  } catch (err) {
    console.log(err);
  }
}

async function mongooseConnectTest(dbUrl) {
  try {
    const authData = {
      user: process.env.MONGO_USER_TEST,
      pass: process.env.MONGO_PWD_TEST,
      dbName: process.env.MONGO_DB_TEST,
      useNewUrlParser: true,
      useCreateIndex: true
    };

    const client = await mongoose.connect(dbUrl, authData);

    if (client) console.log("Connected to Mongo...");
  } catch (err) {
    console.log(err);
  }
}

exports.mongoose = mongoose;
