import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
  fullName: String,
  mobileNumber: String,
  note: String,
});

export default mongoose.model("Task", taskSchema);
