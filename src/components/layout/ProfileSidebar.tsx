import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Settings,
  LogOut,
  MessageSquareText,
  BadgeCheck,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/lib/constants";
import { Icon } from "@iconify/react";
import { ThemeToggle } from '@/components/shared/ThemeToggle';

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string; // allow parent to pass theme-aware classes
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  isOpen,
  onClose,
  className = "",
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showVerifyOptions, setShowVerifyOptions] = React.useState(false);

  const safeNavigate = (path: string) => {
    onClose();
    requestAnimationFrame(() => navigate(path));
  };

  const handleLogout = async () => {
    try {
      await logout();
      safeNavigate(ROUTES.LOGIN);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const profileImage =
    (user?.photoURL && user.photoURL !== "null" ? user.photoURL : null) ||
    user?.avatar ||
    user?.profilePic ||
    "https://i.pravatar.cc/80";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay (keeps same overlay for both themes) */}
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
            // combine default theme-aware classes with any parent-supplied classes
            className={`fixed top-0 right-0 w-80 h-full z-[100] shadow-2xl flex flex-col
              bg-white text-gray-900 border-l border-gray-200
              dark:bg-[#1f1816] dark:text-white dark:border-[#3a2f2d]
              ${className}`}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200 dark:border-[#3a2f2d]">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile</h2>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition"
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>
            </div>

            {/* User Info */}
            <div className="flex flex-col items-center py-6 border-b border-gray-100 dark:border-[#3a2f2d]">
              <img
                src={profileImage}
                alt="profile"
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 dark:border-[#2f2523]"
                onError={(e) => (e.currentTarget.src = "https://i.pravatar.cc/80")}
              />

              <h3 className="mt-3 font-semibold text-gray-900 dark:text-white">
                {user?.displayName || user?.name || "Guest User"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user?.email || "No email"}
              </p>
            </div>

            {/* Options */}
            <div className="flex-1 flex flex-col gap-1 p-4">
              <button
                onClick={() => safeNavigate(ROUTES.PROFILE)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition text-left text-gray-800 dark:text-gray-100"
              >
                <User size={18} /> Profile
              </button>

              <button
                onClick={() => safeNavigate(ROUTES.CHATBOT)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition text-left text-gray-800 dark:text-gray-100"
              >
                <MessageSquareText size={18} /> AI Assistant
              </button>

              <button
                onClick={() => setShowVerifyOptions(!showVerifyOptions)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition text-left text-gray-800 dark:text-gray-100"
              >
                <BadgeCheck size={18} /> Verify as Official
              </button>

              {/* Verification Options */}
              {showVerifyOptions && (
                <div className="ml-8 mt-1 mb-2 flex flex-col gap-2">
                  <button
                    onClick={() => safeNavigate(ROUTES.VERIFY_GOVERNMENT)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-[#2a2a2a] dark:hover:bg-[#2f2f2f] text-sm text-gray-800 dark:text-gray-100"
                  >
                    <Icon icon="mdi:government" className="text-lg text-yellow-500" />
                    <span>Verify as Government Official</span>
                  </button>
                  <button
                    onClick={() => safeNavigate(ROUTES.VERIFY_NGO)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-[#2a2a2a] dark:hover:bg-[#2f2f2f] text-sm text-gray-800 dark:text-gray-100"
                  >
                    <Icon icon="mdi:hand-heart" className="text-lg text-yellow-500" />
                    <span>Verify as NGO</span>
                  </button>
                </div>
              )}

              <div className="px-4 py-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Theme</span>
                </div>
                <ThemeToggle />
              </div>

              <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition text-left text-gray-800 dark:text-gray-100">
                <Settings size={18} /> Settings
              </button>

              <div className="mt-auto px-4 pb-6">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-600/10 transition text-left text-red-600"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default ProfileSidebar;
