import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/lib/constants";
import { Icon } from "@iconify/react";

// Skeleton Component
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`bg-[#2a2a2a] animate-pulse rounded-xl ${className}`} />
);

// Profile Stats Card
const ProfileStatCard = ({ 
  icon, 
  label, 
  value, 
  loading 
}: { 
  icon: string; 
  label: string; 
  value: string; 
  loading: boolean;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-gradient-to-br from-[#2a1e1c]/60 to-[#1e1614]/80 backdrop-blur-md border border-[#3a2f2d]/50 rounded-2xl p-4 text-center"
  >
    {loading ? (
      <div className="space-y-2">
        <SkeletonBlock className="w-8 h-8 mx-auto rounded-full" />
        <SkeletonBlock className="w-12 h-3 mx-auto" />
        <SkeletonBlock className="w-16 h-4 mx-auto" />
      </div>
    ) : (
      <>
        <Icon icon={icon} className="text-lg text-yellow-400 mx-auto mb-1" />
        <p className="text-[10px] text-[#bfb2ac] font-medium">{label}</p>
        <p className="text-xs font-bold text-white">{value}</p>
      </>
    )}
  </motion.div>
);

export function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState(user?.displayName || "");
  const [email] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    console.log("Updating profile:", { username, password, profilePic });
    setIsEditing(false);
    // Simulate saving
    setTimeout(() => {
      alert("Profile updated successfully!");
    }, 500);
  };

  return (
    <div className="bg-[#1f1816] h-screen text-white font-sans flex flex-col">
      {/* Header with Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-[#2b2320]/95 backdrop-blur-md border-b border-[#3a2f2d]/50 px-5 py-4"
      >
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(ROUTES.DASHBOARD)}
            className="flex items-center gap-2 text-[#d8cdc6] hover:text-white transition-colors"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#372a28]/80 hover:bg-[#443331] transition">
              <ArrowLeft size={16} />
            </div>
          </motion.button>

          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
          >
            Profile Settings
          </motion.h1>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#372a28]/80 hover:bg-[#443331] transition"
          >
            <Icon icon={isEditing ? "mdi:close" : "mdi:pencil"} className="text-base text-yellow-400" />
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 px-5 py-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Profile Header Skeleton */}
              <div className="text-center space-y-4">
                <SkeletonBlock className="w-24 h-24 mx-auto rounded-full" />
                <SkeletonBlock className="w-32 h-4 mx-auto" />
                <SkeletonBlock className="w-24 h-3 mx-auto" />
              </div>

              {/* Stats Skeleton */}
              <div className="grid grid-cols-3 gap-3">
                {Array(3).fill(0).map((_, i) => (
                  <SkeletonBlock key={i} className="h-20" />
                ))}
              </div>

              {/* Form Skeleton */}
              <div className="space-y-4">
                <SkeletonBlock className="h-16" />
                <SkeletonBlock className="h-16" />
                <SkeletonBlock className="h-16" />
                <SkeletonBlock className="h-12" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 h-full flex flex-col"
            >
              {/* Profile Header */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-center space-y-4"
              >
                <div className="relative inline-block">
                  <label htmlFor="profilePic" className="cursor-pointer">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl" />
                      <img
                        src={
                          profilePic
                            ? URL.createObjectURL(profilePic)
                            : user?.photoURL || "https://i.pravatar.cc/120"
                        }
                        alt="profile"
                        className="relative w-24 h-24 rounded-full object-cover border-3 border-yellow-400/30 shadow-2xl"
                      />
                      <motion.div
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 transition-opacity"
                      >
                        <Icon icon="mdi:camera" className="text-lg text-white" />
                      </motion.div>
                    </motion.div>
                  </label>
                  <input
                    type="file"
                    id="profilePic"
                    accept="image/*"
                    onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#1f1816] flex items-center justify-center"
                  >
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  </motion.div>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-white">{username || "User"}</h2>
                  <p className="text-xs text-[#bfb2ac]">{email}</p>
                </div>
              </motion.div>

              {/* Profile Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-3 gap-3"
              >
                <ProfileStatCard
                  icon="mdi:shield-check"
                  label="Account"
                  value="Verified"
                  loading={false}
                />
                <ProfileStatCard
                  icon="mdi:calendar-today"
                  label="Joined"
                  value="Sept 2025"
                  loading={false}
                />
                <ProfileStatCard
                  icon="mdi:bell-ring"
                  label="Alerts"
                  value="12 Active"
                  loading={false}
                />
              </motion.div>

              {/* Settings Form */}
              {/* Settings Form */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="max-w-md mx-auto w-full"
>
  <div className="bg-[#2a1e1c]/90 rounded-xl p-6 mb-6 shadow-lg border border-[#3a2f2d]/30">
    {/* Username Field */}
    <div className="mb-4">
      <label className="flex items-center gap-1 text-sm font-medium text-[#bfb2ac] mb-2">
        <Icon icon="mdi:account" className="text-base text-yellow-400" />
        Username
      </label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={!isEditing}
        className="w-full px-3 py-2 text-sm rounded-lg bg-[#1f1816] 
        border border-[#3a2f2d] focus:outline-none focus:ring-1 
        focus:ring-yellow-400 transition-all disabled:opacity-60"
        placeholder="Enter your username"
      />
    </div>

    {/* Email Field */}
    <div className="mb-4">
      <label className="flex items-center gap-1 text-sm font-medium text-[#bfb2ac] mb-2">
        <Icon icon="mdi:email" className="text-base text-yellow-400" />
        Email Address
      </label>
      <input
        type="email"
        value={email}
        disabled
        className="w-full px-3 py-2 text-sm rounded-lg bg-[#1f1816] 
        border border-[#3a2f2d] text-[#bfb2ac] cursor-not-allowed"
      />
    </div>

    {/* Password Field */}
    <AnimatePresence>
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6"
        >
          <label className="flex items-center gap-1 text-sm font-medium text-[#bfb2ac] mb-2">
            <Icon icon="mdi:lock" className="text-base text-yellow-400" />
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg bg-[#1f1816] 
            border border-[#3a2f2d] focus:outline-none focus:ring-1 
            focus:ring-yellow-400 transition-all"
          />
        </motion.div>
      )}
    </AnimatePresence>

    {/* Action Buttons */}
    <div className="flex gap-3">
      {isEditing ? (
        <>
          <button
            onClick={() => setIsEditing(false)}
            className="flex-1 py-2 px-4 text-sm rounded-lg bg-[#372a28] 
            hover:bg-[#443331] text-[#bfb2ac] font-medium transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 px-4 text-sm rounded-lg bg-gradient-to-r 
            from-yellow-400 to-orange-400 text-black font-medium 
            hover:opacity-90 transition-all"
          >
            Save Changes
          </button>
        </>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full py-2 text-sm rounded-lg bg-gradient-to-r 
          from-yellow-400 to-orange-400 text-black font-medium 
          hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          <Icon icon="mdi:pencil" className="text-base" />
          Edit Profile
        </button>
      )}
    </div>
  </div>

  {/* Logout Button */}
  <div className="bg-[#2a1e1c]/90 rounded-xl p-4 shadow-lg border border-[#3a2f2d]/30">
    <button
      onClick={() => null}
      className="w-full py-2 text-sm rounded-lg bg-red-500/20 
      hover:bg-red-500/30 text-red-300 font-medium transition-all 
      flex items-center justify-center gap-2"
    >
      <Icon icon="mdi:logout" className="text-base" />
      Logout
    </button>
  </div>
</motion.div>




            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ProfilePage;
