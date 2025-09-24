import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/lib/constants";

export function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState(user?.displayName || "");
  const [email] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const handleSave = () => {
    console.log("Updating profile:", { username, password, profilePic });
    alert("Profile updated successfully!");
  };

  return (
    <div className="bg-[#1f1816] min-h-screen text-white font-sans px-5 py-10">
      {/* Back Button */}
      <div className="mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className="flex items-center gap-2 text-[#d8cdc6] hover:text-white transition"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg mx-auto"
      >
        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-6 text-center">Profile Settings</h1>

        <Card className="bg-gradient-to-b from-[#2a1e1c] to-[#1e1614] border border-[#3a2f2d] rounded-2xl shadow-2xl">
          <CardContent className="p-6 space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center">
              <label
                htmlFor="profilePic"
                className="relative cursor-pointer group"
              >
                <img
                  src={
                    profilePic
                      ? URL.createObjectURL(profilePic)
                      : user?.photoURL || "https://i.pravatar.cc/80"
                  }
                  alt="profile"
                  className="w-28 h-28 rounded-full object-cover border-2 border-[#3a2f2d] shadow-md"
                />
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <span className="text-xs">Change</span>
                </div>
              </label>
              <input
                type="file"
                id="profilePic"
                accept="image/*"
                onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
                className="hidden"
              />
              <p className="text-sm text-gray-400 mt-2">
                Update Profile Picture
              </p>
            </div>

            <hr className="border-[#3a2f2d]" />

            {/* Username */}
            <div>
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#1f1816] border border-[#3a2f2d] focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Email (readonly) */}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-2 rounded-lg bg-[#1f1816] border border-[#3a2f2d] text-gray-400 cursor-not-allowed"
              />
            </div>

            <hr className="border-[#3a2f2d]" />

            {/* Password Reset */}
            <div>
              <label className="block text-sm mb-1">Reset Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#1f1816] border border-[#3a2f2d] focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Save Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSave}
              className="w-full py-3 rounded-xl bg-yellow-400 text-black font-semibold shadow-lg hover:bg-yellow-500 transition"
            >
              Save Changes
            </motion.button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default ProfilePage;
