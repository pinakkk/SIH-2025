import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import {
  MapPin,
  Phone,
  Info,
  Radio,
  MoreHorizontal,
  Bell,
  ChevronDown,
} from "lucide-react";

import { Icon } from "@iconify/react";
import { useAuth } from "@/hooks/use-auth";
import { BottomNavigation } from "@/components/layout/BottomNavigation";

// ✅ Skeleton with rounded-xl by default
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div
    className={`bg-[#2a2a2a] animate-pulse rounded-xl ${className}`}
  />
);

export function DashboardPage() {
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();

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

  const filterOptions = ["All", "Marked Safe", "Need Help"];

  return (
    <div className="bg-[#1f1816] min-h-screen text-white pb-28 font-sans">
      {/* Sticky Header */}
      <motion.header
        animate={{
          boxShadow: scrolled
            ? "0 8px 20px rgba(0,0,0,0.6)"
            : "0 2px 6px rgba(0,0,0,0.25)",
          backdropFilter: "saturate(120%) blur(6px)",
        }}
        transition={{ duration: 0.2 }}
        className="sticky top-0 z-40 bg-[#2b2320]/55 border-b border-[#3a2f2d] px-5 py-4 flex justify-between items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <img
            src="/src/assets/icons/rescue-saathi.png"
            alt="logo"
            className="w-10 h-10 rounded-md"
          />
          <div>
            <h1 className="font-bold text-lg">Rescue Saathi</h1>
            <p className="text-sm text-[#d8cdc6] flex items-center">
              <MapPin size={14} className="mr-1" /> Kolkata, West Bengal
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <button className="relative w-10 h-10 rounded-full bg-[#372a28] flex items-center justify-center hover:scale-105 transition-transform">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-1 ring-[#372a28]" />
          </button>
          <img
            src={user?.photoURL || "https://i.pravatar.cc/40"}
            alt="profile"
            width={44}
            height={44}
            className="rounded-full object-cover border-2 border-[#2f2523]"
          />
        </motion.div>
      </motion.header>

      <div className="px-5">
        {/* High Wave Alert Box */}
        <div className="mt-5">
          {loading ? (
            <div className="mb-6">
              <SkeletonBlock className="h-14 w-full mb-3" />
              <SkeletonBlock className="h-48 w-full" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="bg-gradient-to-b from-[#2a1e1c] to-[#1e1614] border border-[#3a2f2d] rounded-2xl mb-6 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-start mb-3">
                    <div className="p-2 bg-red-500/15 rounded-full mr-3 flex items-center justify-center">
                      <Icon icon="mdi:waves" className="text-red-400 text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-semibold text-white">
                        High Wave Alert - Odisha Coast
                      </h2>
                      <p className="text-xs text-[#bfb2ac] mt-1">
                        Issued: 17 Sept 2025, 01:30 UTC
                      </p>
                    </div>
                    <div className="ml-3 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-xs text-red-300">Live</span>
                    </div>
                  </div>
                  <div className="w-full h-40 bg-[#131212] rounded-xl overflow-hidden border border-[#3a2f2d]">
                    <img
                      src="https://i.imgur.com/AYp2z2A.png"
                      alt="Alert location map"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Quick Actions */}
        {loading ? (
          <div className="grid grid-cols-4 gap-3 mb-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <SkeletonBlock
                  key={i}
                  className="h-14 w-14 mx-auto rounded-full"
                />
              ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid grid-cols-4 gap-3 mb-6 text-center"
          >
            {[
              { icon: <Phone size={22} />, label: "Emergency\nHotlines" },
              { icon: <Info size={22} />, label: "View\nDetails" },
              { icon: <Radio size={22} />, label: "Report\nUpdates" },
              { icon: <MoreHorizontal size={22} />, label: "See\nMore" },
            ].map((it, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex flex-col items-center gap-1"
              >
                <div className="p-3 rounded-full bg-[#2a2a2a] w-14 h-14 flex items-center justify-center hover:scale-105 transition-transform">
                  {it.icon}
                </div>
                <p className="text-xs leading-tight whitespace-pre-line text-[#d8cdc6]">
                  {it.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Community Updates */}
        <div className="mb-4">
          <h2 className="font-semibold text-lg mb-2">Community Updates</h2>
          {loading ? (
            <SkeletonBlock className="h-10 w-2/3 mb-4" />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center justify-between"
            >
              <div className="flex gap-2">
                {filterOptions.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1 text-sm rounded-full h-auto transition-all focus:outline-none ${
                      filter === f
                        ? "bg-white text-black font-semibold shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
                        : "bg-[#3a2f2d] text-[#e9e2dd] hover:bg-[#4a403d] hover:text-white"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <button className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#3b3230] transition-colors">
                <ChevronDown size={16} />
              </button>
            </motion.div>
          )}
        </div>

        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <Card className="bg-[#2a2a2a] border-0 rounded-2xl mb-4 shadow-lg">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://i.pravatar.cc/40?img=5"
                      alt="profile"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">Pinak Kundu</p>
                      <p className="text-xs text-green-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        Marked as safe
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">3:05 AM</span>
                </div>
                <div className="w-full h-36 bg-gray-700 rounded-xl overflow-hidden mb-3 border border-[#3a2f2d]">
                  <img
                    src="https://i.imgur.com/AYp2z2A.png"
                    alt="Map Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* ✅ Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}

export default DashboardPage;
