import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Settings, LogOut, MessageSquareText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ROUTES } from "@/lib/constants";

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserData {
  _id: string;
  username: string;
  email: string;
  profilePic?: string;
  role?: string;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();

  // 🔥 Fetch user data when sidebar opens
  useEffect(() => {
    if (isOpen) {
      axios
        .get("http://localhost:5002/api/user-data", {
          withCredentials: true, // send cookies
        })
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.data);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch user data:", err);
        });
    }
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5002/api/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      onClose();
      navigate(ROUTES.LOGIN, { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[99]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-80 h-full bg-[#1f1816] border-l border-[#3a2f2d] z-[100] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-[#3a2f2d]">
              <h2 className="text-lg font-semibold">Profile</h2>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#2a2a2a] transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* User Info */}
            <div className="flex flex-col items-center py-6 border-b border-[#3a2f2d]">
              <img
                src={user?.profilePic || "https://i.pravatar.cc/80"}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-[#2f2523]"
              />
              <h3 className="mt-3 font-semibold">
                {user?.username || "Guest User"}
              </h3>
              <p className="text-sm text-gray-400">
                {user?.email || "No email"}
              </p>
              {user?.role && (
                <p className="text-xs text-gray-500 mt-1">Role: {user.role}</p>
              )}
            </div>

            {/* Options */}
            <div className="flex flex-col gap-1 p-4">
              <button
                onClick={() => {
                  navigate(ROUTES.PROFILE);
                  onClose();
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#2a2a2a] transition text-left"
              >
                <User size={18} /> Profile
              </button>
              <button
                onClick={() => {
                  navigate(ROUTES.CHATBOT);
                  onClose();
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#2a2a2a] transition text-left"
              >
                <MessageSquareText size={18} /> AI Assistant
              </button>
              <button
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#2a2a2a] transition text-left"
              >
                <Settings size={18} /> Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-600/20 transition text-left text-red-400"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
