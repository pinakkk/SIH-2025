

import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Home,
  Map,
  AlertTriangle,
  HelpCircle,
  Newspaper,
  Users,
  ShieldAlert, // ✅ emergency mode icon
} from "lucide-react";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/lib/constants";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "home", label: "Homepage", icon: <Home size={20} />, route: ROUTES.DASHBOARD },
    { id: "hazard", label: "Live Hazard Map", icon: <Map size={20} />, route: ROUTES.LIVE_HAZARD_MAP },
    { id: "community", label: "Community", icon: <Users size={20} />, route: ROUTES.COMMUNITY },
    { id: "emergency", label: "Emergency Mode", icon: <ShieldAlert size={20} />, route: ROUTES.EMERGENCY_MODE },
    { id: "evac", label: "Evacuation Centres", icon: <Icon icon="mdi:home-group" className="text-lg" />, route: "/evacuation" },
    { id: "ai", label: "Get info with our AI", icon: <Icon icon="mdi:robot-outline" className="text-lg" />, route: ROUTES.CHATBOT },
    { id: "help", label: "Help & Support", icon: <HelpCircle size={20} />, route: ROUTES.SUPPORT },
    { id: "alerts", label: "Alerts & Notifications", icon: <AlertTriangle size={20} />, route: "/alerts" },
    { id: "news", label: "News & Updates", icon: <Newspaper size={20} />, route: ROUTES.NEWS_AND_UPDATES },
  ];

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black z-[100]"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed top-0 left-0 bottom-0 w-72 
                       bg-gradient-to-b from-[#2b2320] to-[#1a1412] 
                       backdrop-blur-md border-r border-[#3a2f2d] 
                       z-[110] shadow-2xl flex flex-col text-white"
          >
            {/* Scrollable content wrapper */}
            <div
              className="flex-1 overflow-y-auto scroll-smooth"
              style={{
                msOverflowStyle: "none", // IE + Edge
                scrollbarWidth: "none", // Firefox
              }}
            >
              {/* ✅ Hide scrollbar for Webkit browsers (Chrome/Safari) */}
              <style>{`
                .scrollbar-none::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {/* Header */}
              <div className="flex justify-between items-start mb-6 p-5">
                <div className="flex flex-col items-start">
                  <img
                    src="/src/assets/icons/rescue-saathi.png"
                    alt="App Logo"
                    className="w-12 h-12 mb-2"
                  />
                  <h2 className="text-lg font-bold">Rescue Saathi</h2>
                  <p className="text-xs text-[#d8cdc6]">
                    India’s First Social App For Disaster Safety
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-[#372a28] flex items-center justify-center hover:bg-[#4a3a37] transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* User Info */}
              {/* <div className="flex items-center gap-3 mb-6 px-5">
                <img
                  src={user?.photoURL || "https://i.pravatar.cc/40"}
                  alt="profile"
                  className="w-12 h-12 rounded-full border-2 border-[#3a2f2d]"
                />
                <div>
                  <p className="font-medium">{user?.displayName || "Pinak Kundu"}</p>
                  <p className="text-xs text-[#b8aaa5]">
                    {user?.email || "pinakkundu1080@gmail.com"}
                  </p>
                </div>
              </div> */}

              {/* Menu */}
              <nav className="flex flex-col space-y-2 px-3 pb-10">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.route;

                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        navigate(item.route);
                        onClose();
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-yellow-400 text-black font-semibold shadow-lg"
                          : "bg-transparent text-[#e9e2dd] hover:bg-[#3a2f2d]"
                      }`}
                    >
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
