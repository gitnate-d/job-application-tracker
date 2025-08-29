import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, enum: ["Applied","Interview","Offer","Rejected"], default: "Applied" },
  appliedDate: { type: Date, default: Date.now },
  notes: { type: String }
});

export default mongoose.model("Job", jobSchema);
