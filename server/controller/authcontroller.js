import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../modules/User.js";
import transporter from "../config/nodemailer.js";
import admin from "firebase-admin";
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);


// const serviceAccount = require("../config/firebaseServiceKey.json");
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
// }
export const Alluser = async(req,res)=>{try {
    const users = await User.find(); // fetch all users from DB

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }

}
export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.json({ success: false, message: "ID token is required" });

    const decoded = await admin.auth().verifyIdToken(idToken);
    const { email: googleEmail } = decoded;

    const user = await User.findOne({ email: googleEmail });
    if (!user) {
      return res.json({ success: false, message: "User not found. Please register first." });
    }

    // Issue JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true });

    return res.json({ success: true, message: "Google login successful", user });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const registered = async (req, res) => {
  const { username, email, password, profilePic, location } = req.body;

  if (!username || !email || !password) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Parse location if it's sent as string (from form-data)
    let parsedLocation;
    if (location) {
      parsedLocation = typeof location === "string" ? JSON.parse(location) : location;
    }

    const user = new User({
      username,
      email,
      password: hashedPassword,
      profilePic,
      location: parsedLocation, // assign location here
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send welcome email
    const mailOptions = {
      from: "prakhargussain2006@gmail.com",
      to: email,
      subject: "Welcome To SIH PROJECT",
      text: `Hey ${username}, welcome! This email is sent by the SIH project team.`,
    };
    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
// =========================
// Login Controller
// =========================
export const login = async (req, res) => {
  const { idToken } = req.body; // from frontend (Firebase)

  try {
    // 1. Verify token with Firebase
    const decoded = await admin.auth().verifyIdToken(idToken);
    const { email } = decoded;

    // 2. Check if user exists in your DB
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found. Please register first." });
    }

    // 3. Issue your own JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 4. Store in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Google login successful", user });
  } catch (error) {
    console.error("Google login error:", error);
    return res.status(400).json({ success: false, message: "Invalid Google token" });
  }
};

// =========================
// Logout Controller
// =========================
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// =========================
// Send verification OTP
// =========================
export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24h
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your OTP is ${otp}. Verify your account using this OTP.`,
    };
    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "Verification email sent" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// =========================
// Verify email OTP
// =========================
export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const userId = req.userId;

  if (!userId || !otp) {
    return res.status(400).json({ success: false, message: "Missing details" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (!user.verifyOtp || user.verifyOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    return res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// =========================
// Send password reset OTP
// =========================
export const sendRestOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.json({ success: false, message: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. Use it to reset your password.`,
    };
    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "OTP sent to user" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// =========================
// Reset password
// =========================
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ success: false, message: "Email, OTP, and new password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (!user.resetOtp || user.resetOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    return res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};