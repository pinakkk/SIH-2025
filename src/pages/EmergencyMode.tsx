// src/pages/EmergencyMode.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { ROUTES } from "@/lib/constants";

const EmergencyMode: React.FC = () => {
  const navigate = useNavigate();
  const [sosPressed, setSosPressed] = useState(false);
  const [countdown, setCountdown] = useState(0);

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
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-black via-red-900/30 to-orange-900/20 text-white px-6 py-10">
      {/* Header */}
      <div className="flex w-full justify-between items-center mb-6">
        <button 
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className="text-gray-300 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
        >
          <Icon icon="mdi:arrow-left" className="text-xl" />
        </button>
        <h1 className="text-lg font-semibold drop-shadow-md">Emergency Mode</h1>
        <button 
          onClick={() => navigate(ROUTES.EMERGENCY_SETTINGS)}
          className="text-gray-300 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
        >
          <Icon icon="mdi:cog" className="text-xl" />
        </button>
      </div>

      {/* SOS Button */}
      <div className="flex flex-col items-center">
        <button
          onClick={handleSOSPress}
          className={`flex items-center justify-center rounded-full w-48 h-48 shadow-2xl transition-all transform ${
            sosPressed
              ? "bg-gradient-to-br from-orange-500 to-yellow-400 text-black animate-pulse scale-110 shadow-orange-500/50"
              : "bg-gradient-to-br from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 hover:scale-105 shadow-red-500/60"
          }`}
        >
          <div className="text-center">
            <span className="text-5xl font-bold block">SOS</span>
            {sosPressed && countdown > 0 && (
              <span className="text-2xl font-bold">{countdown}</span>
            )}
          </div>
        </button>
        
        {sosPressed && (
          <div className="mt-4 text-center">
            <p className="text-yellow-300 font-semibold">Emergency call starting in {countdown}s</p>
            <p className="text-sm text-gray-300">Tap SOS again to cancel</p>
          </div>
        )}
      </div>

      {/* Action Cards */}
      <div className="w-full max-w-sm space-y-4">
        {/* Quick Actions Row */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => navigate(ROUTES.EMERGENCY_CONTACTS)}
            className="flex flex-col items-center justify-center h-28 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all transform hover:scale-105"
          >
            <Icon icon="mdi:account-group" className="text-3xl mb-2 text-blue-400" />
            <p className="text-sm font-medium text-center">Emergency<br />Contacts</p>
          </button>
          
          <button 
            onClick={() => navigate(ROUTES.LIVE_LOCATION)}
            className="flex flex-col items-center justify-center h-28 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all transform hover:scale-105"
          >
            <Icon icon="mdi:map-marker-radius" className="text-3xl mb-2 text-green-400" />
            <p className="text-sm font-medium text-center">Share Live<br />Location</p>
          </button>
        </div>

        {/* SMS Family Button */}
        <button className="w-full flex items-center justify-center gap-3 h-16 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all transform hover:scale-105">
          <Icon icon="mdi:message-alert" className="text-2xl text-yellow-400" />
          <span className="font-medium">SMS My Family</span>
        </button>

        {/* Emergency Call Button */}
        <button 
          onClick={() => navigate(ROUTES.EMERGENCY_CALLING)}
          className="w-full py-4 rounded-3xl bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold text-lg shadow-2xl shadow-orange-500/30 flex items-center justify-center gap-3 hover:from-orange-600 hover:to-yellow-500 transition-all transform hover:scale-105"
        >
          <Icon icon="mdi:phone-emergency" className="text-xl" />
          Call Emergency Services
        </button>
      </div>
    </div>
  );
};

export default EmergencyMode;
