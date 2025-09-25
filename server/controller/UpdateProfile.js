import User from "../modules/User.js"

export const UpdateProfile=async (req,res)=>{
   try {
    const id = req.userId;
    const profilePicUrl = req.file?.path; // Cloudinary secure_url
    const { username } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          ...(username && { username }),
          ...(profilePicUrl && { profilePic: profilePicUrl }),
        },
      },
      { new: true }
    ).select("-password");

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}