import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/dbconnection.js";
import authRouter from "./routes/Authroutes.js"; // renamed for clarity
import cookieParser from "cookie-parser";
import Reportroutes from "./routes/Reportroutes.js"
import Verifyreport from "./routes/verifyreport.js"
import userRoute from "./routes/userRoutes.js"
import UpdateRoute from "./routes/UpdateRoute.js"

dotenv.config();

const app = express();
const PORT = 5002;
app.use(cookieParser());
app.use(express.json());

// Public route
app.get("/", (req, res) => {
  res.send("🚀 API Running with MongoDB (no Clerk)");
});

// API routes
app.use("/api", authRouter);
app.use("/api",Reportroutes);
app.use("/api",Verifyreport);
app.use("/api",userRoute);
app.use("/api",UpdateRoute);



// Start server only after DB connects
const startServer = async () => {
  try {
    await connectDB(); // ensure DB is connected
    app.listen(PORT, () => {
      console.log(`✅ Server running on: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

startServer();
