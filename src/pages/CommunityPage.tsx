import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { MapPin, Bell, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { BottomNavigation } from "@/components/layout/BottomNavigation";

const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`bg-[#2a2a2a] animate-pulse rounded ${className}`} />
);

const mockPosts = [
  {
    id: 1,
    user: "Ananya Sharma",
    avatar: "https://i.pravatar.cc/40?img=12",
    status: "Marked Safe",
    time: "10:25 AM",
    caption: "The waves are calming down now, but still high tide warning 🚨",
    image: "https://i.imgur.com/AYp2z2A.png",
    location: "Chennai, Tamil Nadu",
  },
  {
    id: 2,
    user: "Rohit Verma",
    avatar: "https://i.pravatar.cc/40?img=33",
    status: "Need Help",
    time: "9:50 AM",
    caption: "Our street is flooded, need assistance!",
    image: "https://i.imgur.com/AYp2z2A.png",
    location: "Kochi, Kerala",
  },
];

export function CommunityPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const filterOptions = ["All", "Marked Safe", "Need Help"];

  return (
    <div className="bg-[#1f1816] min-h-screen text-white font-sans pb-28">
      {/* Sticky Header */}
      <motion.header
        animate={{
          boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          backdropFilter: "saturate(120%) blur(6px)",
        }}
        transition={{ duration: 0.2 }}
        className="sticky top-0 z-40 bg-[#2b2320]/55 border-b border-[#3a2f2d] px-5 py-4 flex justify-between items-center"
      >
        <div className="flex items-center gap-3">
          <img
            src="/src/assets/icons/rescue-saathi.png"
            alt="logo"
            className="w-10 h-10 rounded-md"
          />
          <div>
            <h1 className="font-bold text-lg">Community</h1>
            <p className="text-sm text-[#d8cdc6] flex items-center">
              <MapPin size={14} className="mr-1" /> Coastal India
            </p>
          </div>
        </div>
        <button className="relative w-10 h-10 rounded-full bg-[#372a28] flex items-center justify-center hover:scale-105 transition-transform">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-1 ring-[#372a28]" />
        </button>
      </motion.header>

      <div className="px-5 mt-5">
        {/* Filters */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-2">
            {filterOptions.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1 text-sm rounded-full h-auto transition-all ${
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
        </div>

        {/* Posts */}
        {loading
          ? Array(2)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className="mb-4">
                  <SkeletonBlock className="h-14 w-2/3 mb-3" />
                  <SkeletonBlock className="h-40 w-full rounded-xl" />
                </div>
              ))
          : mockPosts
              .filter((post) =>
                filter === "All" ? true : post.status === filter
              )
              .map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className="bg-[#2b2320]/70 border border-[#3a2f2d] rounded-2xl mb-5 shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.avatar}
                            alt={post.user}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div>
                            <p className="font-medium">{post.user}</p>
                            <p
                              className={`text-xs flex items-center gap-1.5 ${
                                post.status === "Marked Safe"
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  post.status === "Marked Safe"
                                    ? "bg-green-400"
                                    : "bg-red-400"
                                }`}
                              />
                              {post.status}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{post.time}</span>
                      </div>
                      <p className="text-sm mb-3">{post.caption}</p>
                      <div className="w-full h-40 bg-gray-700 rounded-xl overflow-hidden mb-3 border border-[#3a2f2d]">
                        <img
                          src={post.image}
                          alt="Post Media"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-gray-400 flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {post.location}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
      </div>

      {/* ✅ Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}

export default CommunityPage;
