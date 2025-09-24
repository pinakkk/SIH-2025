import Report from "../modules/Report.js";
import Hotspot from "../modules/HotspotScema.js";
import clustering from "density-clustering";

const DISTANCE_THRESHOLD = 3; // km
const MIN_REPORTS = 2; // ✅ now only 2 reports needed

// Haversine distance in km
const toRad = (deg) => (deg * Math.PI) / 180;
const haversineDistance = (p1, p2) => {
  const [lat1, lon1] = p1;
  const [lat2, lon2] = p2;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Handle new report
export const handleNewReport = async (report) => {
  const reportCoord = report.location.coordinates.slice().reverse(); // [lat, lng]
  const hotspots = await Hotspot.find({});

  // 1️⃣ Try to assign report to an existing hotspot
  for (let hotspot of hotspots) {
    const centerCoord = hotspot.center.coordinates.slice().reverse();
    const distance = haversineDistance(reportCoord, centerCoord);

    if (distance <= DISTANCE_THRESHOLD) {
      hotspot.reports.push(report._id);

      // Recalculate centroid
      const reportsInCluster = await Report.find({ _id: { $in: hotspot.reports } });
      const newCentroid = reportsInCluster.reduce(
        (acc, r) => {
          acc[0] += r.location.coordinates[0]; // lng
          acc[1] += r.location.coordinates[1]; // lat
          return acc;
        },
        [0, 0]
      ).map(c => c / reportsInCluster.length);

      hotspot.center.coordinates = newCentroid;
      await hotspot.save();

      report.inCluster = true;
      await report.save();

      console.log("✅ Report added to existing hotspot");
      return hotspot;
    }
  }

  // 2️⃣ If not assigned, leave as pending
  report.inCluster = false;
  await report.save();
  console.log("⚠️ Report not in any hotspot yet");

  // 3️⃣ Try forming new hotspots from pending reports
  const pendingReports = await Report.find({ inCluster: false });
  if (pendingReports.length >= MIN_REPORTS) {
    const points = pendingReports.map(r => r.location.coordinates.slice().reverse());
    const dbscan = new clustering.DBSCAN();
    const clusters = dbscan.run(
      points,
      DISTANCE_THRESHOLD / 6371, // radius in radians
      MIN_REPORTS,
      (p1, p2) => haversineDistance(p1, p2) / 6371
    );

    for (let cluster of clusters) {
      const clusterReports = cluster.map(idx => pendingReports[idx]);

      // Centroid
      const centroid = clusterReports.reduce(
        (acc, r) => {
          acc[0] += r.location.coordinates[0];
          acc[1] += r.location.coordinates[1];
          return acc;
        },
        [0, 0]
      ).map(c => c / clusterReports.length);

      const verifiedCount = clusterReports.filter(r => r.verified).length;

      const hotspot = new Hotspot({
        center: { type: "Point", coordinates: centroid },
        reports: clusterReports.map(r => r._id),
        score: verifiedCount,
        factors: {
          reportCount: clusterReports.length,
          verifiedCount,
          recentFactor: 0,
          hazardTypeFactor: 0,
        },
      });

      await hotspot.save();

      // Mark reports as clustered
      await Report.updateMany(
        { _id: { $in: clusterReports.map(r => r._id) } },
        { $set: { inCluster: true } }
      );

      console.log("🔥 New hotspot created with", clusterReports.length, "reports");
      return hotspot;
    }
  }

  return null; // nothing formed yet
};
