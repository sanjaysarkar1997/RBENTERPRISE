import mongoose from "mongoose";

const Schema = mongoose.Schema;

let product = new Schema({
  productName: {
    type: String,
  },
  productCode: {
    type: String,
  },
  MRP: {
    type: Number,
  },
  salePrice: {
    type: Number,
  },
});

export default mongoose.model("Product", product);
