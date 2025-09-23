import express from "express";
import {
  createEmergencyContact,
  getEmergencyContacts,
  updateEmergencyContact,
  deleteEmergencyContact,
  getEmergencySettings,
  updateEmergencySettings,
  initiateEmergencyCall,
  updateEmergencyCall,
  startLocationSharing,
  updateLocation,
  stopLocationSharing,
  createEmergencyAlert,
} from "../controller/emergencyController.js";
import { authenticateUser } from "../middleware/userAuth.js";

const router = express.Router();

// Emergency Contacts Routes
router.post("/emergency/contacts", authenticateUser, createEmergencyContact);
router.get("/emergency/contacts", authenticateUser, getEmergencyContacts);
router.put("/emergency/contacts/:contactId", authenticateUser, updateEmergencyContact);
router.delete("/emergency/contacts/:contactId", authenticateUser, deleteEmergencyContact);

// Emergency Settings Routes
router.get("/emergency/settings", authenticateUser, getEmergencySettings);
router.put("/emergency/settings", authenticateUser, updateEmergencySettings);

// Emergency Call Routes
router.post("/emergency/call", authenticateUser, initiateEmergencyCall);
router.put("/emergency/call/:callId", authenticateUser, updateEmergencyCall);

// Location Sharing Routes
router.post("/emergency/location/start", authenticateUser, startLocationSharing);
router.put("/emergency/location/:sessionId", authenticateUser, updateLocation);
router.post("/emergency/location/:sessionId/stop", authenticateUser, stopLocationSharing);

// Emergency Alert Routes
router.post("/emergency/alert", authenticateUser, createEmergencyAlert);

// Emergency SOS Route (Quick emergency trigger)
router.post("/emergency/sos", authenticateUser, async (req, res) => {
  try {
    const { location } = req.body;
    const userId = req.user.id;

    // Create emergency alert
    const alertResponse = await createEmergencyAlert({
      body: {
        alertType: "sos",
        severity: "critical",
        message: "SOS Emergency Alert - Immediate assistance required!",
        location,
        notifyEmergencyServices: true,
      },
      user: { id: userId },
    }, res);

    // Don't send response here as createEmergencyAlert already sends it
  } catch (error) {
    console.error("Error handling SOS:", error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Failed to process SOS alert",
        error: error.message,
      });
    }
  }
});

// Get emergency history
router.get("/emergency/history", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { EmergencyCall, EmergencyAlert, EmergencyLocationShare } = await import("../modules/Emergency.js");

    const [calls, alerts, locationSessions] = await Promise.all([
      EmergencyCall.find({ userId }).sort({ createdAt: -1 }).limit(20),
      EmergencyAlert.find({ userId }).sort({ createdAt: -1 }).limit(20),
      EmergencyLocationShare.find({ userId }).sort({ createdAt: -1 }).limit(10),
    ]);

    res.json({
      success: true,
      history: {
        calls,
        alerts,
        locationSessions,
      },
    });
  } catch (error) {
    console.error("Error fetching emergency history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch emergency history",
      error: error.message,
    });
  }
});

// Emergency status check
router.get("/emergency/status", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { EmergencyCall, EmergencyLocationShare } = await import("../modules/Emergency.js");

    const [activeCalls, activeLocationSharing] = await Promise.all([
      EmergencyCall.findOne({ 
        userId, 
        status: { $in: ["initiated", "connecting", "connected"] } 
      }).sort({ createdAt: -1 }),
      EmergencyLocationShare.findOne({ 
        userId, 
        isActive: true 
      }).sort({ createdAt: -1 }),
    ]);

    res.json({
      success: true,
      status: {
        hasActiveCall: !!activeCalls,
        activeCall: activeCalls,
        hasActiveLocationSharing: !!activeLocationSharing,
        activeLocationSession: activeLocationSharing,
      },
    });
  } catch (error) {
    console.error("Error checking emergency status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check emergency status",
      error: error.message,
    });
  }
});

export default router;