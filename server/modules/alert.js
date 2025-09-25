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

    // ✅ coordinates storage
    userLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
    },
    postLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
    },
  },
  { timestamps: true }
);

// ✅ Add 2dsphere indexes for geospatial queries
alertSchema.index({ userLocation: "2dsphere" });
alertSchema.index({ postLocation: "2dsphere" });

export default mongoose.model("Alert", alertSchema);
