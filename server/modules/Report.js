import mongoose from "mongoose";

const { Schema } = mongoose;

const reportSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    hazardType: { type: String, required: true },
    caption: { type: String, required: true }, // ✅ fixed

    // multiple photo URLs
    photos: [{ type: String }],

    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, // [lng, lat]
    },

    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },

    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],

    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

reportSchema.index({ location: "2dsphere" });

const Report = mongoose.model("Report", reportSchema);

export default Report;
