import Alert from "../modules/alert.js";
import Report from "../modules/Report.js";
import User from "../modules/User.js";

export const generateAlertsForReport = async (reportId) => {    
  try {
    // 1. Get the verified report
    const report = await Report.findById(reportId);
    console.log("Report:", report);
    if (!report || !report.verified) return;

    // 2. Find users within 5 km (5000 meters)
    const users = await User.find({});
console.log("All users:", users.map(u => ({ username: u.username, coords: u.location.coordinates })));

    const userss = await User.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: report.location.coordinates },
          distanceField: "dist.calculated",
          maxDistance: 5000,
          spherical: true,
        },
      },
    ]);
    console.log(userss);
    
    if (!users.length) return;

    // 3. Create alerts with distance info
    const alerts = userss.map((u) => {
      const distanceKm = (u.dist.calculated / 1000).toFixed(2);
      return {
        report: report._id,
        user: u._id,
        message: `🚨 ${report.hazardType} reported ${distanceKm} km from your location!`,
        distance: u.dist.calculated, // store numeric distance
      };
    });

    const insertedAlerts = await Alert.insertMany(alerts);
    console.log("hello");
    

    // 4. Push each alert ID into corresponding user's alerts array
    await Promise.all(
      insertedAlerts.map((alert) =>
        User.findByIdAndUpdate(alert.user, { $push: { alerts: alert._id } })
      )
    );

    console.log("✅ Alerts generated and linked to users:", insertedAlerts.length);
  } catch (err) {
    console.error("❌ Error generating alerts:", err);
  }
};
