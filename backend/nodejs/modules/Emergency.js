import mongoose from "mongoose";

// Emergency Contact Schema
const emergencyContactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  relation: {
    type: String,
    required: true,
    trim: true,
  },
  isPrimary: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Emergency Call Schema
const emergencyCallSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  emergencyType: {
    type: String,
    enum: ["medical", "fire", "police", "general", "natural_disaster"],
    default: "general",
  },
  status: {
    type: String,
    enum: ["initiated", "connecting", "connected", "ended", "failed"],
    default: "initiated",
  },
  callStartTime: {
    type: Date,
    default: Date.now,
  },
  callEndTime: {
    type: Date,
  },
  duration: {
    type: Number, // in seconds
    default: 0,
  },
  location: {
    latitude: Number,
    longitude: Number,
    accuracy: Number,
    address: String,
  },
  emergencyNumber: {
    type: String,
    default: "112", // Universal emergency number for India
  },
  notes: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Emergency Settings Schema
const emergencySettingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  autoCallDelay: {
    type: Number,
    default: 10, // seconds
    min: 5,
    max: 30,
  },
  locationSharing: {
    type: Boolean,
    default: true,
  },
  smsAlerts: {
    type: Boolean,
    default: true,
  },
  soundAlerts: {
    type: Boolean,
    default: true,
  },
  vibrationAlerts: {
    type: Boolean,
    default: true,
  },
  emergencyMessage: {
    type: String,
    default: "This is an emergency! I need immediate help. My location is being shared.",
    maxlength: 500,
  },
  quickDial: [{
    type: String,
    trim: true,
  }],
  medicalInfo: {
    bloodType: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"],
      default: "Unknown",
    },
    allergies: {
      type: String,
      default: "None",
      maxlength: 500,
    },
    medications: {
      type: String,
      default: "None",
      maxlength: 500,
    },
    conditions: {
      type: String,
      default: "None",
      maxlength: 500,
    },
  },
}, {
  timestamps: true,
});

// Emergency Location Share Schema
const emergencyLocationShareSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
  },
  sharedWith: [{
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmergencyContact",
    },
    contactInfo: {
      name: String,
      phone: String,
    },
    shareMethod: {
      type: String,
      enum: ["sms", "email", "app_notification"],
      default: "sms",
    },
    status: {
      type: String,
      enum: ["pending", "delivered", "failed"],
      default: "pending",
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
  }],
  locations: [{
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    accuracy: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    battery: {
      type: Number,
      min: 0,
      max: 100,
    },
  }],
}, {
  timestamps: true,
});

// Emergency Alert Schema
const emergencyAlertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  alertType: {
    type: String,
    enum: ["sos", "location_share", "medical", "natural_disaster", "security"],
    required: true,
  },
  severity: {
    type: String,
    enum: ["low", "medium", "high", "critical"],
    default: "high",
  },
  status: {
    type: String,
    enum: ["active", "resolved", "cancelled"],
    default: "active",
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    latitude: Number,
    longitude: Number,
    accuracy: Number,
    address: String,
  },
  contactsNotified: [{
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmergencyContact",
    },
    method: {
      type: String,
      enum: ["sms", "call", "email", "app_notification"],
    },
    status: {
      type: String,
      enum: ["pending", "sent", "delivered", "failed"],
      default: "pending",
    },
    sentAt: Date,
    deliveredAt: Date,
  }],
  emergencyServicesNotified: {
    type: Boolean,
    default: false,
  },
  resolvedAt: {
    type: Date,
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, {
  timestamps: true,
});

// Create indexes for better performance
emergencyContactSchema.index({ userId: 1, isPrimary: 1 });
emergencyCallSchema.index({ userId: 1, createdAt: -1 });
emergencySettingsSchema.index({ userId: 1 });
emergencyLocationShareSchema.index({ userId: 1, isActive: 1 });
emergencyLocationShareSchema.index({ sessionId: 1 });
emergencyAlertSchema.index({ userId: 1, status: 1, createdAt: -1 });

export const EmergencyContact = mongoose.model("EmergencyContact", emergencyContactSchema);
export const EmergencyCall = mongoose.model("EmergencyCall", emergencyCallSchema);
export const EmergencySettings = mongoose.model("EmergencySettings", emergencySettingsSchema);
export const EmergencyLocationShare = mongoose.model("EmergencyLocationShare", emergencyLocationShareSchema);
export const EmergencyAlert = mongoose.model("EmergencyAlert", emergencyAlertSchema);