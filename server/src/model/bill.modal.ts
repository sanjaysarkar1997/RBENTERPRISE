import mongoose from "mongoose";

const Schema = mongoose.Schema;

let bill = new Schema({
  customerName: {
    type: String,
  },
  dateOfBilling: {
    type: String,
  },
  Address: {
    type: String,
  },
  products: {
    type: Array,
  },
});

export default mongoose.model("Bill", bill);
