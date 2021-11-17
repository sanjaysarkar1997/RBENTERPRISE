import mongoose from "mongoose";

const Schema = mongoose.Schema;

let product = new Schema({
  productName: {
    type: String,
  },
  productCode: {
    type: String,
  },
  SKU: {
    type: String,
  },
  GST: {
    type: Number,
  },
  MRP: {
    type: Number,
  },
  companyName: {
    type: String,
  },
  discount: {
    type: Number,
  },
  salePrice: {
    type: Number,
  },
  stock: {
    type: Number,
  },
});

export default mongoose.model("Product", product);
