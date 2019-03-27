const { mongoose } = require("../../db/db");
const { Schema } = mongoose;

const orderSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  total: Number,
  billingAddress: {
    type: Object,
    required: true
  },
  shippingAddress: {
    type: Object,
    required: true
  },
  salesTax: Number,
  createdAt: Date,
  updatedAt: Date,
  shippingMethod: String,
  state: {
    type: String,
    default: "pending"
  },
  paymentMethod: {
    type: String,
    default: "COD"
  },
  quantity: Number,
  customer: {
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String
  },
  isDeleted: Boolean,
  deletedAt: Date
});

exports.Order = mongoose.model("Order", orderSchema);
