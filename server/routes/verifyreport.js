import express from "express";
import Report from "../modules/Report.js"
import { generateAlertsForReport } from "../services/alertService.js";

const Verifyreport = express.Router();

// Route to verify a report and generate alerts (reportId from body)
Verifyreport.post("/verify-report", async (req, res) => {
  try {
    const { reportId } = req.body; // ✅ get reportId from request body

    if (!reportId) {
      return res.status(400).json({ success: false, message: "reportId is required" });
    }

    // 1️⃣ Find the report
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    // 2️⃣ Mark it as verified
    report.verified = true;
    await report.save();

    // 3️⃣ Generate alerts for nearby users
    await generateAlertsForReport(report._id);

    res.status(200).json({
      success: true,
      message: "Report verified and alerts generated",
      report,
    });
  } catch (err) {
    console.error("❌ Verify-report route error:", err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

export default Verifyreport;
