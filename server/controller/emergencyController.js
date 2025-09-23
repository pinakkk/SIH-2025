import {
  EmergencyContact,
  EmergencyCall,
  EmergencySettings,
  EmergencyLocationShare,
  EmergencyAlert,
} from "../modules/Emergency.js";
import { sendSMS } from "../services/notificationService.js";
import { v4 as uuidv4 } from "uuid";

// Emergency Contacts Controllers
export const createEmergencyContact = async (req, res) => {
  try {
    const { name, phone, relation, isPrimary } = req.body;
    const userId = req.user.id;

    // If setting as primary, remove primary status from other contacts
    if (isPrimary) {
      await EmergencyContact.updateMany(
        { userId, isPrimary: true },
        { isPrimary: false }
      );
    }

    const contact = new EmergencyContact({
      userId,
      name,
      phone,
      relation,
      isPrimary: isPrimary || false,
    });

    await contact.save();
    res.status(201).json({
      success: true,
      message: "Emergency contact created successfully",
      contact,
    });
  } catch (error) {
    console.error("Error creating emergency contact:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create emergency contact",
      error: error.message,
    });
  }
};

export const getEmergencyContacts = async (req, res) => {
  try {
    const userId = req.user.id;
    const contacts = await EmergencyContact.find({ userId, isActive: true })
      .sort({ isPrimary: -1, createdAt: -1 });

    res.json({
      success: true,
      contacts,
    });
  } catch (error) {
    console.error("Error fetching emergency contacts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch emergency contacts",
      error: error.message,
    });
  }
};

export const updateEmergencyContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { name, phone, relation, isPrimary } = req.body;
    const userId = req.user.id;

    // If setting as primary, remove primary status from other contacts
    if (isPrimary) {
      await EmergencyContact.updateMany(
        { userId, isPrimary: true, _id: { $ne: contactId } },
        { isPrimary: false }
      );
    }

    const contact = await EmergencyContact.findOneAndUpdate(
      { _id: contactId, userId },
      { name, phone, relation, isPrimary },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Emergency contact not found",
      });
    }

    res.json({
      success: true,
      message: "Emergency contact updated successfully",
      contact,
    });
  } catch (error) {
    console.error("Error updating emergency contact:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update emergency contact",
      error: error.message,
    });
  }
};

export const deleteEmergencyContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const userId = req.user.id;

    const contact = await EmergencyContact.findOneAndUpdate(
      { _id: contactId, userId },
      { isActive: false },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Emergency contact not found",
      });
    }

    res.json({
      success: true,
      message: "Emergency contact deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting emergency contact:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete emergency contact",
      error: error.message,
    });
  }
};

// Emergency Settings Controllers
export const getEmergencySettings = async (req, res) => {
  try {
    const userId = req.user.id;
    let settings = await EmergencySettings.findOne({ userId });

    // Create default settings if none exist
    if (!settings) {
      settings = new EmergencySettings({ userId });
      await settings.save();
    }

    res.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("Error fetching emergency settings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch emergency settings",
      error: error.message,
    });
  }
};

export const updateEmergencySettings = async (req, res) => {
  try {
    const userId = req.user.id;
    const settingsData = req.body;

    const settings = await EmergencySettings.findOneAndUpdate(
      { userId },
      settingsData,
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: "Emergency settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error("Error updating emergency settings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update emergency settings",
      error: error.message,
    });
  }
};

// Emergency Call Controllers
export const initiateEmergencyCall = async (req, res) => {
  try {
    const {
      emergencyType = "general",
      location,
      emergencyNumber = "112",
    } = req.body;
    const userId = req.user.id;

    const emergencyCall = new EmergencyCall({
      userId,
      emergencyType,
      location,
      emergencyNumber,
      status: "initiated",
    });

    await emergencyCall.save();

    // Notify emergency contacts
    await notifyEmergencyContacts(userId, {
      type: "emergency_call",
      message: `Emergency call initiated by user`,
      location,
    });

    res.status(201).json({
      success: true,
      message: "Emergency call initiated successfully",
      call: emergencyCall,
    });
  } catch (error) {
    console.error("Error initiating emergency call:", error);
    res.status(500).json({
      success: false,
      message: "Failed to initiate emergency call",
      error: error.message,
    });
  }
};

export const updateEmergencyCall = async (req, res) => {
  try {
    const { callId } = req.params;
    const { status, duration, notes } = req.body;
    const userId = req.user.id;

    const updateData = { status };
    if (status === "ended") {
      updateData.callEndTime = new Date();
      updateData.duration = duration;
    }
    if (notes) updateData.notes = notes;

    const call = await EmergencyCall.findOneAndUpdate(
      { _id: callId, userId },
      updateData,
      { new: true }
    );

    if (!call) {
      return res.status(404).json({
        success: false,
        message: "Emergency call not found",
      });
    }

    res.json({
      success: true,
      message: "Emergency call updated successfully",
      call,
    });
  } catch (error) {
    console.error("Error updating emergency call:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update emergency call",
      error: error.message,
    });
  }
};

// Location Sharing Controllers
export const startLocationSharing = async (req, res) => {
  try {
    const { contactIds, location } = req.body;
    const userId = req.user.id;
    const sessionId = uuidv4();

    // Get emergency contacts
    const contacts = await EmergencyContact.find({
      _id: { $in: contactIds },
      userId,
      isActive: true,
    });

    const sharedWith = contacts.map(contact => ({
      contactId: contact._id,
      contactInfo: {
        name: contact.name,
        phone: contact.phone,
      },
      shareMethod: "sms",
      status: "pending",
    }));

    const locationShare = new EmergencyLocationShare({
      userId,
      sessionId,
      sharedWith,
      locations: [location],
    });

    await locationShare.save();

    // Send location to contacts
    await sendLocationToContacts(contacts, location, sessionId);

    res.status(201).json({
      success: true,
      message: "Location sharing started successfully",
      sessionId,
      locationShare,
    });
  } catch (error) {
    console.error("Error starting location sharing:", error);
    res.status(500).json({
      success: false,
      message: "Failed to start location sharing",
      error: error.message,
    });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { location } = req.body;
    const userId = req.user.id;

    const locationShare = await EmergencyLocationShare.findOneAndUpdate(
      { sessionId, userId, isActive: true },
      { $push: { locations: location } },
      { new: true }
    );

    if (!locationShare) {
      return res.status(404).json({
        success: false,
        message: "Location sharing session not found",
      });
    }

    res.json({
      success: true,
      message: "Location updated successfully",
    });
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update location",
      error: error.message,
    });
  }
};

export const stopLocationSharing = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.id;

    const locationShare = await EmergencyLocationShare.findOneAndUpdate(
      { sessionId, userId, isActive: true },
      { isActive: false, endTime: new Date() },
      { new: true }
    );

    if (!locationShare) {
      return res.status(404).json({
        success: false,
        message: "Location sharing session not found",
      });
    }

    res.json({
      success: true,
      message: "Location sharing stopped successfully",
    });
  } catch (error) {
    console.error("Error stopping location sharing:", error);
    res.status(500).json({
      success: false,
      message: "Failed to stop location sharing",
      error: error.message,
    });
  }
};

// Emergency Alert Controllers
export const createEmergencyAlert = async (req, res) => {
  try {
    const {
      alertType,
      severity = "high",
      message,
      location,
      notifyEmergencyServices = true,
    } = req.body;
    const userId = req.user.id;

    const alert = new EmergencyAlert({
      userId,
      alertType,
      severity,
      message,
      location,
      emergencyServicesNotified: notifyEmergencyServices,
    });

    await alert.save();

    // Notify emergency contacts
    await notifyEmergencyContacts(userId, {
      type: alertType,
      message,
      location,
      severity,
    });

    res.status(201).json({
      success: true,
      message: "Emergency alert created successfully",
      alert,
    });
  } catch (error) {
    console.error("Error creating emergency alert:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create emergency alert",
      error: error.message,
    });
  }
};

// Helper Functions
const notifyEmergencyContacts = async (userId, alertData) => {
  try {
    const contacts = await EmergencyContact.find({
      userId,
      isActive: true,
    });

    const settings = await EmergencySettings.findOne({ userId });
    const message = settings?.emergencyMessage || alertData.message;

    for (const contact of contacts) {
      try {
        // Send SMS notification
        await sendSMS(contact.phone, message);
        console.log(`Emergency notification sent to ${contact.name}`);
      } catch (error) {
        console.error(`Failed to notify ${contact.name}:`, error);
      }
    }
  } catch (error) {
    console.error("Error notifying emergency contacts:", error);
  }
};

const sendLocationToContacts = async (contacts, location, sessionId) => {
  try {
    for (const contact of contacts) {
      const locationMessage = `Emergency Location Alert!\nLocation: ${location.address || "Unknown address"}\nCoordinates: ${location.latitude}, ${location.longitude}\nTrack live location: ${process.env.APP_URL}/track/${sessionId}`;
      
      try {
        await sendSMS(contact.phone, locationMessage);
        console.log(`Location sent to ${contact.name}`);
      } catch (error) {
        console.error(`Failed to send location to ${contact.name}:`, error);
      }
    }
  } catch (error) {
    console.error("Error sending location to contacts:", error);
  }
};