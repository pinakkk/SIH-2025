import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  console.log("✅ Token Received:", token);

  if (!token) {
    console.warn("❌ No token provided");
    return res.status(401).json({ success: false, message: "Not authorized, login again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token Decoded:", decoded);

    if (!decoded.id) {
      console.warn("❌ Token missing user ID");
      return res.status(401).json({ success: false, message: "Not authorized, invalid token" });
    }

    // Best practice: attach to req.userId or req.user, not req.body
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.error("❌ JWT Verification Error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default userAuth;