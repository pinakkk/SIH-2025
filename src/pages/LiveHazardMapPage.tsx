import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Search, RefreshCw, ShieldCheck, MapPin } from "lucide-react";
import { Icon } from "@iconify/react";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { useAuth } from "@/hooks/use-auth";
import AppLogo from '../assets/icons/rescue-saathi.png'
import { Sidebar } from "@/components/layout/Sidebar";

const alerts = [
  {
    id: 1,
    title: "High Wave Alert – Odisha Coast",
    issued: "Issued: 17 Sept 2025, 01:30 UTC",
    mapImage: "https://i.imgur.com/AYp2z2A.png",
  },
  {
    id: 2,
    title: "Swell Surge – Kerala",
    issued: "Issued: 19 Sept 2025, 02:30 UTC",
    mapImage: "https://i.imgur.com/AYp2z2A.png",
  },
];

// ✅ Skeleton with rounded-xl by default
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`bg-[#2a2a2a] animate-pulse rounded-xl ${className}`} />
);

export function LiveHazardMapPage() {
  const [view, setView] = useState("List View");
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-[#1f1816] min-h-screen text-white font-sans pb-28">
      {/* Sticky Header */}
      <motion.header
        animate={{
          boxShadow: scrolled
            ? "0 8px 20px rgba(0,0,0,0.6)"
            : "0 2px 6px rgba(0,0,0,0.25)",
          backdropFilter: "saturate(120%) blur(6px)",
        }}
        transition={{ duration: 0.25 }}
        className="sticky top-0 z-40 bg-[#2b2320]/55 border-b border-[#3a2f2d] px-5 py-4 flex justify-between items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <button onClick={() => setSidebarOpen(true)}>
            <img
              src={AppLogo}
              alt="logo"
              className="w-10 h-10 rounded-md"
            />
          </button>

          <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

          <div>
            <h1 className="font-bold text-lg">Live Hazard Map</h1>
            <p className="text-sm text-[#d8cdc6] flex items-center">
              <MapPin size={14} className="mr-1" /> India, Coastal Regions
            </p>
          </div>
        </motion.div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="relative w-10 h-10 rounded-full bg-[#372a28] flex items-center justify-center transition-transform"
        >
          <RefreshCw size={18} />
        </motion.button>
      </motion.header>

      <div className="px-5 mt-5">
        {/* Search Bar */}
        {loading ? (
          <SkeletonBlock className="h-12 w-full rounded-full mb-5" />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative mb-5"
          >
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-[#2b2320]/70 border border-[#3a2f2d] rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </motion.div>
        )}

        {/* View Toggle */}
        {loading ? (
          <SkeletonBlock className="h-10 w-full rounded-full mb-6" />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center bg-[#2b2320]/70 border border-[#3a2f2d] rounded-full p-1 mb-6"
          >
            {["Map View", "List View"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors ${view === v
                    ? "bg-white text-black"
                    : "text-[#e9e2dd] hover:text-white"
                  }`}
              >
                {v}
              </button>
            ))}
          </motion.div>
        )}

        {/* Alerts List */}
        <div className="space-y-4">
          {loading
            ? Array(2)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className="mb-4">
                  <SkeletonBlock className="h-6 w-1/2 mb-3" />
                  <SkeletonBlock className="h-40 w-full" />
                </div>
              ))
            : alerts.map((alert, i) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
              >
                <Card className="bg-gradient-to-b from-[#2a1e1c] to-[#1e1614] border border-[#3a2f2d] rounded-2xl overflow-hidden shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-red-500/15 rounded-full flex items-center justify-center">
                        <Icon
                          icon="mdi:waves"
                          className="text-red-400 text-2xl"
                        />
                      </div>
                      <div className="flex-1">
                        <h2 className="font-semibold text-white">
                          {alert.title}
                        </h2>
                        <p className="text-xs text-[#bfb2ac]">
                          {alert.issued}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                          <span className="text-xs text-red-300 font-medium">
                            Live
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-40 rounded-xl overflow-hidden mb-4 border border-[#3a2f2d]">
                      <img
                        src={alert.mapImage}
                        alt="Map Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        className="flex-1 bg-white text-black font-semibold py-2.5 rounded-full hover:scale-[1.02] transition-transform"
                      >
                        View Details
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        className="flex-1 bg-[#2b2320] border border-[#3a2f2d] text-white font-semibold py-2.5 rounded-full flex items-center justify-center gap-2 hover:bg-[#3b3230] transition-colors"
                      >
                        <ShieldCheck size={18} className="text-green-400" />
                        Mark as safe
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>
      </div>

      {/* ✅ Reusable Navbar */}
      <BottomNavigation />
    </div>
  );
}
