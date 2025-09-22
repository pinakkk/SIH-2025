import Report from "../modules/Report.js"
import Comment from "../modules/Comment.js"
export const Postcreated = async (req, res) => {
  try {
    console.log("hel");
    
    const { hazardType, caption, lng, lat } = req.body;

    // ✅ user comes from JWT middleware
    const userId = req.userId;

    // extract uploaded photo URLs from Cloudinary
    const photoUrls = req.files.map((file) => file.path);

    const report = new Report({
      user: userId,
      hazardType,
      caption, // ✅ added
      photos: photoUrls,
      location: {
        type: "Point",
        coordinates: [parseFloat(lng), parseFloat(lat)], // [lng, lat]
      },
    });

    await report.save();

    res.status(201).json({
      success: true,
      message: "Report created successfully",
      report,
    });
  } catch (error) {
    console.error("Report Creation Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const commentSend = async (req, res) => {
  try {
    const { reportId, comment } = req.body;
    const userId = req.userId; // assuming JWT middleware sets req.userId

    if (!reportId || !comment) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // 1️⃣ Check if report exists
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    // 2️⃣ Create and save comment
    const newComment = new Comment({
      user: userId,
      report: reportId,
      text: comment
    });

    await newComment.save();

    // 3️⃣ Push comment to report's comments array
    report.comments.push(newComment._id);
    await report.save();

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment
    });

  } catch (err) {
    console.error("Comment error:", err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};