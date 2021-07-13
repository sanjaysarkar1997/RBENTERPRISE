import mongoose from 'mongoose';


const Schema = mongoose.Schema;

let userDetails = new Schema({
    firstName: {
        type: "String",
    },
    lastName: {
        type: "String",
    },
    email: {
        type: String,
    },
    mobile_number: {
        type: Number,
        required: "Mobile Number is Needed",
    },
    password: {
        type: "String",
    },
    Address: {
        type: ["Mixed"],
    },
});

export default mongoose.model("UserDetails", userDetails);
