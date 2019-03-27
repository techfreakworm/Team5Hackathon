const mongoose = require("mongoose"),
  blueBird = require("bluebird");

process.env.NODE_ENV === "production"
  ? mongooseConnectProd(process.env.MONGO_URL)
  : mongooseConnectLocal(process.env.MONGO_URL);

async function mongooseConnectLocal(dbUrl) {
  try {
    const authData = {
      user: "root",
      pass: "123456",
      useNewUrlParser: true,
      useCreateIndex: true,
      dbName: "softwidgetapi"
    };

    const client = await mongoose.connect(dbUrl, authData);

    if (client) console.log("Connected to Mongo...");
  } catch (err) {
    console.log(err);
  }
}

async function mongooseConnectProd(dbUrl) {
  try {
    const authData = {
      user: "username",
      pass: "pwd",
      useNewUrlParser: true,
      useCreateIndex: true,
      dbName: "softwidgetapi"
    };

    const client = await mongoose.connect(dbUrl, authData);

    if (client) console.log("Connected to Mongo...");
  } catch (err) {
    console.log(err);
  }
}

exports.mongoose = mongoose;
