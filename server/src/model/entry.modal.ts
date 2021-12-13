import mongoose from "mongoose";

const Schema = mongoose.Schema;

let entry = new Schema({
  dateOfEntry: {
    type: String,
  },
  billNo: {
    type: String,
  },
  products: {
    type: Array,
  },
});

export default mongoose.model("Entry", entry);
