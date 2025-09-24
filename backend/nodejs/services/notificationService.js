import twilio from "twilio";
import nodemailer from "nodemailer";

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Initialize email transporter
const emailTransporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// SMS Service
export const sendSMS = async (phone, message) => {
  try {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      console.log("SMS Service not configured. Would send:", { phone, message });
      return { success: true, mock: true };
    }

    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    console.log(`SMS sent successfully to ${phone}:`, result.sid);
    return { success: true, messageId: result.sid };
  } catch (error) {
    console.error(`Failed to send SMS to ${phone}:`, error);
    throw error;
  }
};

// Email Service
export const sendEmail = async (to, subject, message) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("Email Service not configured. Would send:", { to, subject, message });
      return { success: true, mock: true };
    }

    const result = await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message,
      html: `<p>${message.replace(/\n/g, '<br>')}</p>`,
    });

    console.log(`Email sent successfully to ${to}:`, result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    throw error;
  }
};

// Emergency SMS Template
export const sendEmergencySMS = async (phone, userInfo, location, customMessage) => {
  const message = customMessage || `🚨 EMERGENCY ALERT 🚨
${userInfo.name} needs immediate help!

Location: ${location.address || 'Unknown address'}
Coordinates: ${location.latitude}, ${location.longitude}
Accuracy: ±${location.accuracy}m

Time: ${new Date().toLocaleString()}

This is an automated emergency alert from Rescue Saathi.`;

  return await sendSMS(phone, message);
};

// Location sharing SMS
export const sendLocationSMS = async (phone, userInfo, location, sessionId) => {
  const message = `📍 LIVE LOCATION SHARING
${userInfo.name} is sharing their live location with you.

Current Location: ${location.address || 'Unknown address'}
Coordinates: ${location.latitude}, ${location.longitude}

Track live location: ${process.env.APP_URL}/track/${sessionId}

This location sharing was started at ${new Date().toLocaleString()}`;

  return await sendSMS(phone, message);
};

// Bulk notification service
export const sendBulkNotifications = async (contacts, message, type = 'sms') => {
  const results = [];
  
  for (const contact of contacts) {
    try {
      let result;
      if (type === 'sms') {
        result = await sendSMS(contact.phone, message);
      } else if (type === 'email' && contact.email) {
        result = await sendEmail(contact.email, "Emergency Alert", message);
      }
      
      results.push({
        contact: contact.name,
        success: true,
        messageId: result.messageId,
      });
    } catch (error) {
      results.push({
        contact: contact.name,
        success: false,
        error: error.message,
      });
    }
  }
  
  return results;
};

// Push notification service (for future implementation)
export const sendPushNotification = async (deviceTokens, title, body, data = {}) => {
  // This would integrate with Firebase Cloud Messaging or similar service
  console.log("Push notification would be sent:", { deviceTokens, title, body, data });
  return { success: true, mock: true };
};

// Emergency notification dispatcher
export const dispatchEmergencyNotification = async (contacts, alertData) => {
  const { type, message, location, userInfo, sessionId } = alertData;
  const results = [];

  for (const contact of contacts) {
    try {
      let notificationMessage;
      
      switch (type) {
        case 'sos':
          notificationMessage = await sendEmergencySMS(
            contact.phone, 
            userInfo, 
            location, 
            message
          );
          break;
          
        case 'location_share':
          notificationMessage = await sendLocationSMS(
            contact.phone, 
            userInfo, 
            location, 
            sessionId
          );
          break;
          
        default:
          notificationMessage = await sendSMS(contact.phone, message);
      }
      
      results.push({
        contactId: contact._id,
        contact: contact.name,
        phone: contact.phone,
        success: true,
        messageId: notificationMessage.messageId,
      });
      
    } catch (error) {
      results.push({
        contactId: contact._id,
        contact: contact.name,
        phone: contact.phone,
        success: false,
        error: error.message,
      });
    }
  }
  
  return results;
};