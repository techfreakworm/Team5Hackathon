const { mongoose } = require('../../db/db');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  price: Number,
  sku: String,
  description: String,
  type: String
});

exports.Product = mongoose.model('Product', productSchema);
