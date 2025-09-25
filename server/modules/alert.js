import mongoose from "mongoose";

const { Schema } = mongoose;

const alertSchema = new Schema(
  {
    report: { type: Schema.Types.ObjectId, ref: "Report", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Alert", alertSchema);
