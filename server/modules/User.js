import mongoose from "mongoose";

const { Schema } = mongoose;

// =========================
// 1. USER SCHEMA
// =========================
const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },

    password: { type: String, required: true }, // 🔹 added password

    role: {
      type: String,
      enum: ["Citizen", "Volunteer", "Analyst", "Official"],
      default: "Citizen",
    },

    profilePic: { type: String, default: "" }, // photo URL

    posts: [{ type: Schema.Types.ObjectId, ref: "Report" }],

    score: { type: Number, default: 0 },

    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates:{ type: [Number], required: true } 
, // [lng, lat]
    },

    // =========================
    // Alerts
    // =========================
    alerts: [{ type: Schema.Types.ObjectId, ref: "Alert" }], // 🛑 added alerts reference

    // =========================
    // OTP + Account Verification
    // =========================
    verifyOtp: { type: String, default: "" },
    verifyOtpExpireAt: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },

    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Geo index for location-based queries
userSchema.index({ location: "2dsphere" });

// =========================
// EXPORT MODELS
// =========================
const User = mongoose.model("User", userSchema);

export default User;
