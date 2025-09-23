// src/pages/LiveLocationPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { ROUTES } from "@/lib/constants";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  address: string;
}

const LiveLocationPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSharing, setIsSharing] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [battery] = useState(85);
  const [shareHistory] = useState([
    { id: 1, contact: "Mom", time: "2 min ago", status: "delivered" },
    { id: 2, contact: "Dad", time: "2 min ago", status: "delivered" },
    { id: 3, contact: "Emergency Services", time: "2 min ago", status: "delivered" },
  ]);

  useEffect(() => {
    // Simulate getting location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: Date.now(),
            address: "Sample Address, City, State", // In real app, use reverse geocoding
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Set fallback location for demo
          setLocation({
            latitude: 28.6139,
            longitude: 77.2090,
            accuracy: 10,
            timestamp: Date.now(),
            address: "New Delhi, India",
          });
        }
      );
    }
  }, []);

  const handleStartSharing = () => {
    setIsSharing(true);
    // In real app, start location sharing service
  };

  const handleStopSharing = () => {
    setIsSharing(false);
    // In real app, stop location sharing service
  };

  const formatCoordinates = (lat: number, lng: number) => {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  };

  const copyLocation = () => {
    if (location) {
      const locationText = `My Emergency Location: ${location.address}\nCoordinates: ${formatCoordinates(location.latitude, location.longitude)}\nGoogle Maps: https://maps.google.com/?q=${location.latitude},${location.longitude}`;
      navigator.clipboard.writeText(locationText);
      alert("Location copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900/20 text-white px-6 py-10">
      {/* Header */}
      <div className="flex w-full justify-between items-center mb-8">
        <button 
          onClick={() => navigate(ROUTES.EMERGENCY_MODE)}
          className="text-gray-300 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
        >
          <Icon icon="mdi:arrow-left" className="text-xl" />
        </button>
        <h1 className="text-xl font-semibold drop-shadow-md">Live Location</h1>
        <button 
          onClick={copyLocation}
          className="text-blue-400 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
        >
          <Icon icon="mdi:content-copy" className="text-xl" />
        </button>
      </div>

      {/* Location Status */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-blue-300">Location Sharing</h2>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            isSharing 
              ? "bg-green-500/20 border border-green-500/30 text-green-300" 
              : "bg-gray-500/20 border border-gray-500/30 text-gray-300"
          }`}>
            <div className={`w-2 h-2 rounded-full ${isSharing ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}></div>
            {isSharing ? "Active" : "Inactive"}
          </div>
        </div>

        {location && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Icon icon="mdi:map-marker" className="text-red-400 text-xl" />
              <div>
                <p className="text-sm text-gray-300">Current Location</p>
                <p className="font-medium">{location.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="mdi:crosshairs-gps" className="text-blue-400 text-xl" />
              <div>
                <p className="text-sm text-gray-300">Coordinates</p>
                <p className="font-mono text-sm">{formatCoordinates(location.latitude, location.longitude)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="mdi:target" className="text-yellow-400 text-xl" />
              <div>
                <p className="text-sm text-gray-300">Accuracy</p>
                <p className="text-sm">±{location.accuracy.toFixed(0)} meters</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Placeholder */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-6 h-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20 flex items-center justify-center">
          <div className="text-center">
            <Icon icon="mdi:map" className="text-6xl text-blue-400 mb-2" />
            <p className="text-gray-300">Interactive Map</p>
            <p className="text-sm text-gray-400">Shows your real-time location</p>
          </div>
        </div>
        {/* Simulated location pin */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
        </div>
      </div>

      {/* Device Status */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-yellow-300">Device Status</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Icon icon="mdi:battery" className="text-2xl text-green-400" />
            <div>
              <p className="text-sm text-gray-300">Battery</p>
              <p className="font-semibold">{battery}%</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Icon icon="mdi:wifi" className="text-2xl text-blue-400" />
            <div>
              <p className="text-sm text-gray-300">Connection</p>
              <p className="font-semibold">Strong</p>
            </div>
          </div>
        </div>
      </div>

      {/* Share History */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-orange-300">Shared With</h3>
        <div className="space-y-3">
          {shareHistory.map((share) => (
            <div key={share.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-black font-bold text-sm">
                  {share.contact.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{share.contact}</p>
                  <p className="text-sm text-gray-400">{share.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="mdi:check-circle" className="text-green-400" />
                <span className="text-sm text-green-300">{share.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="space-y-4">
        {!isSharing ? (
          <button
            onClick={handleStartSharing}
            className="w-full py-4 rounded-3xl bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold text-lg shadow-2xl shadow-green-500/30 flex items-center justify-center gap-3 hover:from-green-700 hover:to-green-600 transition-all transform hover:scale-105"
          >
            <Icon icon="mdi:play" className="text-xl" />
            Start Sharing Location
          </button>
        ) : (
          <button
            onClick={handleStopSharing}
            className="w-full py-4 rounded-3xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold text-lg shadow-2xl shadow-red-500/30 flex items-center justify-center gap-3 hover:from-red-700 hover:to-red-600 transition-all transform hover:scale-105"
          >
            <Icon icon="mdi:stop" className="text-xl" />
            Stop Sharing Location
          </button>
        )}

        <button
          onClick={() => navigate(ROUTES.EMERGENCY_CONTACTS)}
          className="w-full py-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-gray-300 font-semibold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3"
        >
          <Icon icon="mdi:account-group" className="text-xl" />
          Manage Emergency Contacts
        </button>
      </div>
    </div>
  );
};

export default LiveLocationPage;