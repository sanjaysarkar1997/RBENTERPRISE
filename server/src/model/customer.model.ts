import mongoose from "mongoose";

const Schema = mongoose.Schema;

let customer = new Schema({
  customerName: {
    type: String,
  },
  Address1: {
    type: String,
  },
  Address2: {
    type: String,
  },
  mobileNumber: {
    type: Number,
  },
});

export default mongoose.model("Customer", customer);
