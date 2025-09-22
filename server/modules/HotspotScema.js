import mongoose from "mongoose";

const { Schema } = mongoose;

const hotspotSchema = new Schema(
  {
    center: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, // [lng, lat]
    },

    reports: [
      {
        type: Schema.Types.ObjectId,
        ref: "Report", // reference to the hazard reports in this hotspot
      },
    ],

    score: { type: Number, default: 0 }, // higher = more dangerous

    factors: {
      reportCount: { type: Number, default: 0 },
      verifiedCount: { type: Number, default: 0 },
      recentFactor: { type: Number, default: 0 }, // e.g., based on recency of reports
      hazardTypeFactor: { type: Number, default: 0 }, // can weight certain hazards more
    },
  },
  { timestamps: true }
);

// Geo index for location queries
hotspotSchema.index({ center: "2dsphere" });

const Hotspot = mongoose.model("Hotspot", hotspotSchema);

export default Hotspot;
