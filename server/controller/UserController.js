import User from "../modules/User.js";
import Report from "../modules/Report.js";
import Hotspot from "../modules/HotspotScema.js";
import Alert from "../modules/alert.js";
export const UserData = async (req, res) => {
        const id = req.userId
  try {
    const users = await User.findById(id)
      .populate({
        path: 'posts', 
        populate: {
          path: 'comments', 
          model: 'Comment',
        },
      })
      .populate('alerts'); 

    res.json({
      success: true,
      data: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};



export const AllReport = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate({
        path: "user", // user who submitted report
        select: "username email profilePic"
      })
      .populate({
        path: "comments", // comments of report
        populate: {
          path: "user", // user of each comment
          select: "username email profilePic"
        }
      })
      .sort({ createdAt: -1 }); // newest reports first

    res.status(200).json({
      success: true,
      data: reports
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reports",
      error: error.message
    });
  }
};






export const Allhotspot = async (req, res) => {
  try {
    const hotspots = await Hotspot.find()
      .populate({
        path: "reports",
        populate: [
          {
            path: "user",
            select: "username email profilePic" // user who submitted report
          },
          {
            path: "comments",
            populate: {
              path: "user",
              select: "username email profilePic" // comment user
            }
          }
        ]
      })
      .sort({ "reports.createdAt": -1 }); // optional: newest reports first

    res.status(200).json({
      success: true,
      data: hotspots
    });
  } catch (error) {
    console.error("Error fetching hotspots:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch hotspots",
      error: error.message
    });
  }
};
export const AlluserAlert = async (req, res) => {
  const userId = req.userId;

  try {
    // ✅ Find alerts for this user, sorted by newest first
    const alerts = await Alert.find({ user: userId })
      .populate({
        path: "report",
        select: "hazardType caption location photos verified createdAt",
        populate: {
          path: "user",
          select: "username email profilePic",
        },
      })
      .populate({
        path: "user",
        select: "username email profilePic role location",
      })
      .sort({ createdAt: -1 });

    if (!alerts || alerts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No alerts found for this user",
      });
    }

    res.status(200).json({
      success: true,
      count: alerts.length,
      alerts,
    });
  } catch (error) {
    console.error("Error fetching alerts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch alerts",
      error: error.message,
    });
  }
};


export const UserReports = async (req, res) => {
  try {
    const id = req.userId; // userId from route like /api/reports/:userId
    console.log(id);
    

    const reports = await Report.findById(id)
      .populate({
        path: "user",
        select: "username email profilePic"
      })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "username email profilePic"
        }
      })
      .sort({ createdAt: -1 }); // newest first

    if (!reports || reports.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No reports found for this user"
      });
    }

    res.status(200).json({
      success: true,
      data: reports
    });
  } catch (error) {
    console.error("Error fetching user reports:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user reports",
      error: error.message
    });
  }
};