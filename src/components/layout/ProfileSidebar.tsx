// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, User, Settings, LogOut } from "lucide-react";
// import { useAuth } from "@/hooks/use-auth";

// interface ProfileSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
//   isOpen,
//   onClose,
// }) => {
//   const { user, logout } = useAuth();

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Overlay */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.5 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             onClick={onClose}
//             className="fixed inset-0 bg-black z-[99]"
//           />

//           {/* Sidebar */}
//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             className="fixed top-0 right-0 w-80 h-full bg-[#1f1816] border-l border-[#3a2f2d] z-[100] shadow-2xl flex flex-col"
//           >
//             {/* Header */}
//             <div className="flex justify-between items-center px-5 py-4 border-b border-[#3a2f2d]">
//               <h2 className="text-lg font-semibold">Profile</h2>
//               <button
//                 onClick={onClose}
//                 className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#2a2a2a] transition"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* User Info */}
//             <div className="flex flex-col items-center py-6 border-b border-[#3a2f2d]">
//               <img
//                 src={user?.photoURL || "https://i.pravatar.cc/80"}
//                 alt="profile"
//                 className="w-20 h-20 rounded-full object-cover border-2 border-[#2f2523]"
//               />
//               <h3 className="mt-3 font-semibold">{user?.displayName || "Guest User"}</h3>
//               <p className="text-sm text-gray-400">{user?.email || "No email"}</p>
//             </div>

//             {/* Options */}
//             <div className="flex flex-col gap-1 p-4">
//               <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#2a2a2a] transition text-left">
//                 <User size={18} /> Profile
//               </button>
//               <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#2a2a2a] transition text-left">
//                 <Settings size={18} /> Settings
//               </button>
//             </div>

//             {/* Logout at Bottom */}
//             <div className="mt-auto p-4">
//               <button
//                 onClick={() => {
//                   logout();
//                   onClose();
//                 }}
//                 className="flex items-center gap-3 w-full px-4 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 transition text-left text-white font-medium"
//               >
//                 <LogOut size={18} /> Logout
//               </button>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };


import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
                src={user?.photoURL || "https://i.pravatar.cc/80"}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-[#2f2523]"
              />
              <h3 className="mt-3 font-semibold">{user?.displayName || "Guest User"}</h3>
              <p className="text-sm text-gray-400">{user?.email || "No email"}</p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-1 p-4">
              <button
                onClick={() => {
                  navigate("/profile");
                  onClose();
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#2a2a2a] transition text-left"
              >
                <User size={18} /> Profile
              </button>
              <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#2a2a2a] transition text-left">
                <Settings size={18} /> Settings
              </button>
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
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
