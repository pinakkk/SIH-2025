// src/pages/EmergencyCallingPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { ROUTES } from "@/lib/constants";
import { useTheme } from "@/hooks/use-theme";

const EmergencyCallingPage: React.FC = () => {
  const navigate = useNavigate();
  const [callDuration, setCallDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    // Simulate connecting to emergency services
    const connectTimer = setTimeout(() => {
      setIsConnected(true);
    }, 3000);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    navigate(ROUTES.EMERGENCY_MODE);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#1b140e] bg-opacity-95 px-4">
      <div className="w-full max-w-sm text-gray-800 dark:text-white backdrop-blur-2xl bg-white/90 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-2xl p-8 rounded-[2rem]">
        
        {/* Header */}
        <div className="flex w-full justify-between items-center mb-6">
          <button 
            onClick={() => navigate(ROUTES.EMERGENCY_MODE)}
            className="text-gray-600 dark:text-gray-300 p-2 rounded-full bg-gray-100 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
          >
            <Icon icon="mdi:arrow-left" className="text-lg" />
          </button>
          <h1 className="text-lg font-semibold text-orange-600 dark:text-orange-100 drop-shadow-md">Emergency Call</h1>
          <button className="text-gray-600 dark:text-gray-300 p-2 rounded-full bg-gray-100 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20">
            <Icon icon="mdi:dots-vertical" className="text-lg" />
          </button>
        </div>

        {/* Emergency Icon */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/src/assets/icons/emergency-calling.png"
            alt="Emergency Calling"
            className="w-38]]]] h-32 mb-4 drop-shadow-lg"
          />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#F57F01] via-[#F89103] to-[#FFC008] text-transparent bg-clip-text drop-shadow-md">
            EMERGENCY CALLING
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-2 text-center">
            {!isConnected ? "Connecting to Emergency Services..." : "Connected to Emergency Services"}
          </p>
        </div>

        {/* Call Timer Display */}
        <div className="bg-gray-100/80 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[2rem] px-6 py-4 mb-6">
          <div className="text-center">
            {!isConnected ? (
              <div className="flex items-center justify-center gap-3">
                <div className="animate-pulse w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-lg text-gray-600 dark:text-gray-300">Connecting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-2xl font-mono font-bold text-green-600 dark:text-green-400">
                  {formatTime(callDuration)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Emergency Number */}
        <div className="text-center mb-6">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Calling</p>
          <p className="text-orange-600 dark:text-orange-400 font-bold text-lg">+91 112</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">National Emergency Response</p>
        </div>

        {/* Location Status */}
        <div className="bg-green-100 dark:bg-green-500/10 backdrop-blur-xl border border-green-200 dark:border-green-500/20 rounded-[2rem] px-4 py-3 mb-8">
          <div className="flex items-center justify-center gap-2">
            <Icon icon="mdi:map-marker" className="text-green-600 dark:text-green-400 text-lg" />
            <span className="text-sm text-green-700 dark:text-green-300">Location shared automatically</span>
          </div>
        </div>

        {/* Call Control Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {/* Mute Button */}
          <button className="w-14 h-14 rounded-full bg-gray-100 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/20 transition-all">
            <Icon icon="mdi:microphone-off" className="text-xl text-gray-600 dark:text-gray-300" />
          </button>

          {/* Speaker Button */}
          <button className="w-14 h-14 rounded-full bg-gray-100 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/20 transition-all">
            <Icon icon="mdi:volume-high" className="text-xl text-gray-600 dark:text-gray-300" />
          </button>

          {/* Add Call Button */}
          <button className="w-14 h-14 rounded-full bg-gray-100 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/20 transition-all">
            <Icon icon="mdi:phone-plus" className="text-xl text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* End Call Button */}
        <button 
          onClick={handleEndCall}
          className="w-full py-4 rounded-[2rem] bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold text-lg shadow-2xl flex items-center justify-center gap-3 hover:from-red-700 hover:to-red-600 hover:opacity-90 hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
        >
          <Icon icon="mdi:phone-hangup" className="text-xl" />
          End Call
        </button>
      </div>
    </div>
  );
};

export default EmergencyCallingPage;