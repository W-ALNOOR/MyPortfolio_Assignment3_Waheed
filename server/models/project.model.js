import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Project title is required",
  },
  description: {
    type: String,
    required: "Project description is required",
  },
  firstname: {
    type: String,
    required: "First name is required",
  },
  lastname: {
    type: String,
    required: "Last name is required",
  },
  email: {
    type: String,
    required: "Email is required",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Project", projectSchema);
