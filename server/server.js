import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbconnection.js";
import authRouter from "./routes/Authroutes.js";
import cookieParser from "cookie-parser";
import Reportroutes from "./routes/Reportroutes.js"
import Verifyreport from "./routes/verifyreport.js"
import userRoute from "./routes/userRoutes.js"
import UpdateRoute from "./routes/UpdateRoute.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// CORS configuration for production
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173", 
    "https://sih-2025-roan.vercel.app/" // Replace with your actual Vercel URL
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check route
app.get("/", (req, res) => {
  res.json({ 
    message: "🚀 Rescue Saathi API Running", 
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use("/api", authRouter);
app.use("/api", Reportroutes);
app.use("/api", Verifyreport);
app.use("/api", userRoute);
app.use("/api", UpdateRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'API endpoint not found' 
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
