// src/pages/EmergencyMode.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { ROUTES } from "@/lib/constants";
import AppLogo from '../assets/icons/rescue-saathi.png';

// ✅ Skeleton with rounded-xl by default
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div
    className={`bg-[#2a2a2a] animate-pulse rounded-xl ${className}`}
  />
);

const EmergencyMode: React.FC = () => {
  const navigate = useNavigate();
  const [sosPressed, setSosPressed] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const handleSOSPress = () => {
    if (!sosPressed) {
      setSosPressed(true);
      setCountdown(10);
      
      // Start countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Auto-navigate to emergency calling after countdown
            navigate(ROUTES.EMERGENCY_CALLING);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      // Cancel emergency call
      setSosPressed(false);
      setCountdown(0);
    }
  };

  return (
    <div className="bg-[#1f1816] min-h-screen text-white font-sans flex flex-col">
      {/* Sticky Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-40 bg-[#2b2320]/85 backdrop-blur-md border-b border-[#3a2f2d] px-5 py-4 flex justify-between items-center"
      >
        {loading ? (
          <>
            <SkeletonBlock className="w-10 h-10 rounded-full" />
            <SkeletonBlock className="w-32 h-6" />
            <SkeletonBlock className="w-10 h-10 rounded-full" />
          </>
        ) : (
          <>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(ROUTES.DASHBOARD)}
              className="w-10 h-10 rounded-full bg-[#372a28] flex items-center justify-center hover:bg-[#4a403d] transition-colors"
            >
              <Icon icon="solar:arrow-left-outline" className="text-xl text-[#d8cdc6]" />
            </motion.button>
            <div className="flex items-center gap-3">
              <img
                src={AppLogo}
                alt="logo"
                className="w-8 h-8 rounded-md"
              />
              <h1 className="text-lg font-semibold">Emergency Mode</h1>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(ROUTES.EMERGENCY_SETTINGS)}
              className="w-10 h-10 rounded-full bg-[#372a28] flex items-center justify-center hover:bg-[#4a403d] transition-colors"
            >
              <Icon icon="solar:settings-outline" className="text-xl text-[#d8cdc6]" />
            </motion.button>
          </>
        )}
      </motion.header>

      {/* Main Content - Fixed Height */}
      <div className="flex-1 flex flex-col px-5 py-6 justify-between max-h-[calc(100vh-80px)] overflow-hidden">
        {loading ? (
          <div className="flex flex-col justify-between h-full">
            {/* SOS Button Skeleton */}
            <div className="flex justify-center items-center flex-1">
              <SkeletonBlock className="w-48 h-48 rounded-full" />
            </div>
            
            {/* Action Cards Skeleton */}
            <div className="w-full max-w-sm mx-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <SkeletonBlock className="h-28 rounded-3xl" />
                <SkeletonBlock className="h-28 rounded-3xl" />
              </div>
              <SkeletonBlock className="h-16 rounded-3xl" />
              <SkeletonBlock className="h-14 rounded-3xl" />
            </div>
          </div>
        ) : (
          <>
            {/* SOS Button Section */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center justify-center flex-1"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSOSPress}
                className={`flex items-center justify-center rounded-full w-48 h-48 shadow-2xl transition-all relative ${
                  sosPressed
                    ? "bg-gradient-to-br from-orange-500 to-yellow-400 text-black animate-pulse shadow-orange-500/50"
                    : "bg-gradient-to-br from-red-600 to-red-500 shadow-red-500/40"
                }`}
              >
                <div className="text-center">
                  <Icon 
                    icon={sosPressed ? "solar:shield-warning-bold" : "solar:danger-triangle-bold"} 
                    className="text-5xl mb-2" 
                  />
                  <span className="text-2xl font-bold block">SOS</span>
                  {sosPressed && countdown > 0 && (
                    <span className="text-xl font-bold">{countdown}</span>
                  )}
                </div>
              </motion.button>
              
              {sosPressed && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center"
                >
                  <p className="text-yellow-300 font-semibold">Emergency call starting in {countdown}s</p>
                  <p className="text-sm text-[#d8cdc6]">Tap SOS again to cancel</p>
                </motion.div>
              )}
            </motion.div>

            {/* Action Cards - Fixed at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="w-full max-w-sm mx-auto space-y-4"
            >
              {/* Quick Actions Row */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(ROUTES.EMERGENCY_CONTACTS)}
                  className="flex flex-col items-center justify-center h-28 rounded-2xl bg-[#2a2a2a] border border-[#3a2f2d] shadow-lg hover:bg-[#353535] transition-all"
                >
                  <Icon icon="solar:users-group-rounded-bold" className="text-3xl mb-2 text-blue-400" />
                  <p className="text-sm font-medium text-center text-[#d8cdc6]">Emergency<br />Contacts</p>
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(ROUTES.LIVE_LOCATION)}
                  className="flex flex-col items-center justify-center h-28 rounded-2xl bg-[#2a2a2a] border border-[#3a2f2d] shadow-lg hover:bg-[#353535] transition-all"
                >
                  <Icon icon="solar:map-point-wave-bold" className="text-3xl mb-2 text-green-400" />
                  <p className="text-sm font-medium text-center text-[#d8cdc6]">Share Live<br />Location</p>
                </motion.button>
              </div>

              {/* SMS Family Button */}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 h-16 rounded-2xl bg-[#2a2a2a] border border-[#3a2f2d] shadow-lg hover:bg-[#353535] transition-all"
              >
                <Icon icon="solar:chat-round-bold" className="text-xl text-yellow-400" />
                <span className="font-medium text-[#d8cdc6]">SMS My Family</span>
              </motion.button>

              {/* Emergency Call Button */}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(ROUTES.EMERGENCY_CALLING)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold text-lg shadow-xl shadow-orange-500/20 flex items-center justify-center gap-3 hover:from-orange-600 hover:to-yellow-500 transition-all"
              >
                <Icon icon="solar:phone-calling-bold" className="text-xl" />
                Call Emergency Services
              </motion.button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmergencyMode;
