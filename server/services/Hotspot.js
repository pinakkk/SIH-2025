import Report from "./models/Report.js";
import Hotspot from "./models/Hotspot.js";
import DBSCAN from "density-clustering";

// Parameters
const DISTANCE_THRESHOLD = 1; // in km (DBSCAN uses "units", so we convert)
const MIN_REPORTS = 3;

// Convert meters to radians for Haversine formula
const kmToRadians = (km) => km / 6371;

async function generateHotspotsDBSCAN() {
  const reports = await Report.find({});
  if (!reports.length) return [];

  // Prepare data points: [lat, lng]
  const points = reports.map(r => r.location.coordinates.slice().reverse()); // [lat, lng]

  // DBSCAN clustering
  const dbscan = new DBSCAN();
  // eps in radians, minPts = MIN_REPORTS
  const clusters = dbscan.run(points, kmToRadians(DISTANCE_THRESHOLD), MIN_REPORTS, (p1, p2) => {
    // Haversine distance between points
    const [lat1, lon1] = p1;
    const [lat2, lon2] = p2;
    const toRad = deg => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return c; // distance in radians
  });

  const hotspots = [];

  for (let cluster of clusters) {
    const clusterReports = cluster.map(idx => reports[idx]);

    // Calculate centroid
    const centroid = clusterReports.reduce(
      (acc, r) => {
        acc[0] += r.location.coordinates[0]; // lng
        acc[1] += r.location.coordinates[1]; // lat
        return acc;
      },
      [0, 0]
    ).map(coord => coord / clusterReports.length);

    // Calculate factors
    const verifiedCount = clusterReports.filter(r => r.verified).length;

    const hotspot = new Hotspot({
      center: { type: "Point", coordinates: centroid },
      reports: clusterReports.map(r => r._id),
      score: verifiedCount, // simple example
      factors: {
        reportCount: clusterReports.length,
        verifiedCount,
        recentFactor: 0,     // can calculate by timestamps
        hazardTypeFactor: 0, // can calculate based on hazard type
      },
    });

    await hotspot.save();
    hotspots.push(hotspot);
  }

  console.log(`${hotspots.length} hotspots generated via DBSCAN.`);
  return hotspots;
}
