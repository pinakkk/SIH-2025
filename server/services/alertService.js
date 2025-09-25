import Alert from "../modules/alert.js";
import Report from "../modules/Report.js";
import User from "../modules/User.js";

export const generateAlertsForReport = async (reportId) => {
  try {
    // 1. Get the verified report
    const report = await Report.findById(reportId);
    if (!report) {
      console.error("❌ Report not found");
      return;
    }
    console.log("Report:", report);

    // 2. Find users within 5 km
    const usersNearby = await User.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: report.location.coordinates },
          distanceField: "dist.calculated",
          maxDistance: 5000,
          spherical: true,
        },
      },
    ]);

    if (!usersNearby.length) {
      console.log("⚠️ No nearby users found");
      return;
    }

    // 3. Create alerts with distance + severity
    const alerts = usersNearby.map((u) => {
      const distanceMeters = u.dist.calculated;
      const distanceKm = (distanceMeters / 1000).toFixed(2);

      // Simple severity logic (closer distance → higher severity)
      let severity = "low";
      if (distanceMeters <= 1000) severity = "critical";
      else if (distanceMeters <= 2000) severity = "high";
      else if (distanceMeters <= 3500) severity = "medium";

      return {
        report: report._id,
        user: u._id,
        message: `🚨 ${report.hazardType} reported ${distanceKm} km from your location!`,
        alertType: "hazard",
        distance: distanceMeters,
        severity,
      };
    });

    const insertedAlerts = await Alert.insertMany(alerts);

    // 4. Link alerts to users
    await Promise.all(
      insertedAlerts.map((alert) =>
        User.findByIdAndUpdate(alert.user, { $push: { alerts: alert._id } })
      )
    );

    console.log("✅ Alerts generated:", insertedAlerts.length);
  } catch (err) {
    console.error("❌ Error generating alerts:", err);
  }
};
