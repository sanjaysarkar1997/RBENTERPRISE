import mongoose from "mongoose";

const Schema = mongoose.Schema;

let billNonGST = new Schema({
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
  products: {
    type: Array,
  },
});

export default mongoose.model("BillNonGST", billNonGST);
