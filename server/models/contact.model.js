import mongoose, { Mongoose } from "mongoose";

const contactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type:String,
        required: true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
}, { timestamps: true});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;