import mongoose from "mongoose";

const { Schema } = mongoose;

const alertSchema = new Schema(
  {
    report: { type: Schema.Types.ObjectId, ref: "Report", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },

    // ✅ new fields
    alertType: {
      type: String,
      enum: ["hazard", "system", "weather", "custom"],
      default: "hazard",
    },
    distance: { type: Number, required: true }, // store in meters
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Alert", alertSchema);
