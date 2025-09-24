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
   
    const alerts = await Alert.find({ user: userId })
      .sort({ createdAt: -1 }); 

    res.status(200).json({
      success: true,
      data: alerts
    });
  } catch (error) {
    console.error("Error fetching alerts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch alerts",
      error: error.message
    });
  }
};