// src/pages/LiveLocationPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { 
  MapPin, 
  ArrowLeft, 
  Copy, 
  Share2, 
  Users, 
  Battery, 
  Wifi, 
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Square
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { ROUTES } from "@/lib/constants";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  address: string;
}

// Skeleton loading component
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`bg-[#2a2a2a] animate-pulse rounded-xl ${className}`} />
);

const LiveLocationPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSharing, setIsSharing] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [battery] = useState(85);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [shareHistory] = useState([
    { id: 1, contact: "Mom", time: "2 min ago", status: "delivered", avatar: "M" },
    { id: 2, contact: "Dad", time: "2 min ago", status: "delivered", avatar: "D" },
    { id: 3, contact: "Emergency Services", time: "2 min ago", status: "delivered", avatar: "ES" },
  ]);

  useEffect(() => {
    // Loading simulation
    const timer = setTimeout(() => setLoading(false), 1200);
    
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
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    <div className="bg-[#1f1816] min-h-screen text-white font-sans">
      {/* Sticky Header */}
      <motion.header
        animate={{
          boxShadow: scrolled
            ? "0 8px 20px rgba(0,0,0,0.6)"
            : "0 2px 6px rgba(0,0,0,0.25)",
          backdropFilter: "saturate(120%) blur(6px)",
        }}
        transition={{ duration: 0.2 }}
        className="sticky top-0 z-40 bg-[#2b2320]/85 border-b border-[#3a2f2d] px-4 sm:px-5 py-3 sm:py-4 flex justify-between items-center"
      >
        <motion.button 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate(ROUTES.EMERGENCY_MODE)}
          className="w-10 h-10 rounded-full bg-[#372a28] flex items-center justify-center hover:scale-105 transition-transform text-gray-300"
        >
          <ArrowLeft size={18} />
        </motion.button>
        
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-lg sm:text-xl font-bold"
        >
          Live Location
        </motion.h1>
        
        <motion.button 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          onClick={copyLocation}
          className="w-10 h-10 rounded-full bg-[#372a28] flex items-center justify-center hover:scale-105 transition-transform text-blue-400"
        >
          <Copy size={18} />
        </motion.button>
      </motion.header>

      <div className="px-4 sm:px-5">
        {/* Location Status Card */}
        <div className="mt-4 sm:mt-5">
          {loading ? (
            <SkeletonBlock className="h-32 w-full mb-4" />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="bg-gradient-to-b from-[#2a1e1c] to-[#1e1614] border border-[#3a2f2d] rounded-2xl mb-4 shadow-lg">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/15 rounded-full">
                        <Share2 className="text-blue-400" size={20} />
                      </div>
                      <div>
                        <h2 className="font-semibold text-white">Location Sharing</h2>
                        <p className="text-xs text-[#bfb2ac]">Emergency tracking active</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                      isSharing 
                        ? "bg-green-500/20 border border-green-500/30 text-green-300" 
                        : "bg-gray-500/20 border border-gray-500/30 text-gray-300"
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${isSharing ? "bg-green-400 animate-pulse" : "bg-gray-400"}`} />
                      {isSharing ? "Active" : "Inactive"}
                    </div>
                  </div>

                  {location && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="text-red-400" size={18} />
                        <div className="flex-1">
                          <p className="text-sm text-[#bfb2ac]">Current Location</p>
                          <p className="font-medium text-sm">{location.address}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:crosshairs-gps" className="text-blue-400 text-sm" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-[#bfb2ac]">Coordinates</p>
                            <p className="font-mono text-xs truncate">{formatCoordinates(location.latitude, location.longitude)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:target" className="text-yellow-400 text-sm" />
                          <div>
                            <p className="text-xs text-[#bfb2ac]">Accuracy</p>
                            <p className="text-xs">±{location.accuracy.toFixed(0)}m</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Interactive Map */}
        {loading ? (
          <div className="mb-4 relative">
            <SkeletonBlock className="h-48 w-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="bg-[#2a2a2a] border-0 rounded-2xl mb-4 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="h-48 bg-gradient-to-br from-blue-500/20 to-green-500/20 relative flex items-center justify-center">
                  <div className="text-center">
                    <Icon icon="mdi:map" className="text-5xl text-blue-400 mb-2" />
                    <p className="text-[#d8cdc6] font-medium">Interactive Map</p>
                    <p className="text-sm text-[#bfb2ac]">Real-time location tracking</p>
                  </div>
                  {/* Animated location pin */}
                  <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-lg" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Device Status */}
        {loading ? (
          <SkeletonBlock className="h-20 w-full mb-4" />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="bg-[#2a2a2a] border-0 rounded-2xl mb-4 shadow-lg">
              <CardContent className="p-4 sm:p-5">
                <h3 className="font-semibold mb-3 text-yellow-300 flex items-center gap-2">
                  <AlertCircle size={18} />
                  Device Status
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Battery className="text-green-400" size={20} />
                    <div>
                      <p className="text-sm text-[#bfb2ac]">Battery</p>
                      <p className="font-semibold text-white">{battery}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wifi className="text-blue-400" size={20} />
                    <div>
                      <p className="text-sm text-[#bfb2ac]">Signal</p>
                      <p className="font-semibold text-white">Strong</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Share History */}
        {loading ? (
          <SkeletonBlock className="h-32 w-full mb-6" />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card className="bg-[#2a2a2a] border-0 rounded-2xl mb-6 shadow-lg">
              <CardContent className="p-4 sm:p-5">
                <h3 className="font-semibold mb-4 text-orange-300 flex items-center gap-2">
                  <Users size={18} />
                  Shared With ({shareHistory.length})
                </h3>
                <div className="space-y-3">
                  {shareHistory.map((share, index) => (
                    <motion.div 
                      key={share.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-black font-bold text-sm">
                          {share.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-white">{share.contact}</p>
                          <p className="text-sm text-[#bfb2ac] flex items-center gap-1">
                            <Clock size={12} />
                            {share.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-green-400" size={16} />
                        <span className="text-sm text-green-300">{share.status}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Control Buttons */}
        {loading ? (
          <div className="space-y-4 mb-8">
            <SkeletonBlock className="h-14 w-full" />
            <SkeletonBlock className="h-14 w-full" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="space-y-4 mb-8"
          >
            {!isSharing ? (
              <motion.button
                onClick={handleStartSharing}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold text-base sm:text-lg shadow-2xl shadow-green-500/30 flex items-center justify-center gap-3 hover:from-green-700 hover:to-green-600 transition-all"
              >
                <Play size={18} />
                Start Sharing Location
              </motion.button>
            ) : (
              <motion.button
                onClick={handleStopSharing}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold text-base sm:text-lg shadow-2xl shadow-red-500/30 flex items-center justify-center gap-3 hover:from-red-700 hover:to-red-600 transition-all"
              >
                <Square size={18} />
                Stop Sharing Location
              </motion.button>
            )}

            <motion.button
              onClick={() => navigate(ROUTES.EMERGENCY_CONTACTS)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 sm:py-4 rounded-2xl bg-[#372a28] border border-[#3a2f2d] text-[#d8cdc6] font-semibold text-base sm:text-lg hover:bg-[#4a403d] transition-all flex items-center justify-center gap-3"
            >
              <Users size={18} />
              Manage Emergency Contacts
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LiveLocationPage;