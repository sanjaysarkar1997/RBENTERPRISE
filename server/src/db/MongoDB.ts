import mongoose from "mongoose"
import { successLog } from "../services/logServices";

require("dotenv").config()


const connectMongoDB = mongoose.connect(
  `${process.env.MONGO_URL_LOCAL}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err: any) => {
    if (err) {
      console.log(err);
    } else {
      successLog("MongoDB Connected");
    }
  }
);


export default connectMongoDB