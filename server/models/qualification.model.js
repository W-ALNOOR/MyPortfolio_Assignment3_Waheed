import mongoose, { Mongoose } from "mongoose";

const qualificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
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
    },
    completion: {type:Date},
    description: {type:String}
}, { timestamps: true});

const Qualification = mongoose.model("Qualification", qualificationSchema);
export default Qualification;