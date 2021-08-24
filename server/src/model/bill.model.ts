import mongoose from "mongoose";

const Schema = mongoose.Schema;

let bill = new Schema({
  customerName: {
    type: String,
  },
  dateOfBilling: {
    type: String,
  },
  billNo: {
    type: String,
  },
  Address1: {
    type: String,
  },
  Address2: {
    type: String,
  },
  mobileNumber: {
    type: String,
  },
  gstNumber: {
    type: String,
  },
  products: {
    type: Array,
  },
});

export default mongoose.model("Bill", bill);
