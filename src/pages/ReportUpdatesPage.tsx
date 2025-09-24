import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Radio, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

// Skeleton component
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`bg-[#2a2a2a]/60 animate-pulse rounded-xl ${className}`}>
    <div className="p-3 sm:p-4 space-y-3">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-[#3a3a3a]/80 rounded-lg animate-pulse"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-[#3a3a3a]/80 rounded animate-pulse w-3/4"></div>
          <div className="h-3 bg-[#3a3a3a]/60 rounded animate-pulse w-full"></div>
          <div className="flex justify-between">
            <div className="h-3 bg-[#3a3a3a]/60 rounded animate-pulse w-1/3"></div>
            <div className="h-3 bg-[#3a3a3a]/60 rounded animate-pulse w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const UpdateCard = ({ title, description, location, time, severity, icon }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    className="cursor-pointer"
  >
    <Card className="bg-gradient-to-br from-[#2a1e1c]/90 to-[#1e1614]/90 border border-[#3a2f2d]/50 rounded-xl shadow-sm hover:shadow-lg hover:border-[#3a2f2d]/70 transition-all duration-300 backdrop-blur-sm active:scale-[0.98]">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start space-x-3">
          <div className={`p-2 ${severity === 'high' ? 'bg-red-500/10 border border-red-500/20' : severity === 'medium' ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-green-500/10 border border-green-500/20'} rounded-lg flex items-center justify-center flex-shrink-0`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2 gap-2">
              <h3 className="font-medium text-white text-sm sm:text-base leading-tight">{title}</h3>
              <span className={`px-2 py-1 rounded-md text-xs font-medium flex-shrink-0 ${
                severity === 'high' ? 'bg-red-500/15 text-red-400 border border-red-500/30' :
                severity === 'medium' ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30' :
                'bg-green-500/15 text-green-400 border border-green-500/30'
              }`}>
                {severity.charAt(0).toUpperCase() + severity.slice(1)}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#bfb2ac]/90 mb-3 leading-relaxed overflow-hidden" 
               style={{
                 display: '-webkit-box',
                 WebkitLineClamp: 2,
                 WebkitBoxOrient: 'vertical'
               }}>{description}</p>
            <div className="flex items-center justify-between text-xs text-[#8b7e79] gap-2">
              <span className="flex items-center gap-1 truncate">
                <Icon icon="material-symbols:location-on-outline" className="text-xs flex-shrink-0 opacity-70" />
                {location}
              </span>
              <span className="flex items-center gap-1 flex-shrink-0">
                <Icon icon="material-symbols:schedule-outline" className="text-xs opacity-70" />
                {time}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export function ReportUpdatesPage() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const updates = [
    {
      title: "Cyclone Warning",
      description: "Category 3 cyclone approaching the coast. Expected landfall in 24 hours.",
      location: "Bay of Bengal",
      time: "2 hours ago",
      severity: "high",
      icon: <AlertCircle size={22} className="text-red-400" />,
    },
    {
      title: "Flood Alert Update",
      description: "Water levels rising in Krishna River. Monitoring situation closely.",
      location: "Krishna Basin",
      time: "4 hours ago",
      severity: "medium",
      icon: <Radio size={22} className="text-yellow-400" />,
    },
    {
      title: "Weather Update",
      description: "Heavy rainfall expected in the next 48 hours. Stay prepared.",
      location: "Coastal Region",
      time: "6 hours ago",
      severity: "low",
      icon: <Radio size={22} className="text-green-400" />,
    },
  ];

  const filterOptions = ["all", "high", "medium", "low"];

  return (
    <div className="bg-[#1f1816] h-screen flex flex-col text-white font-sans overflow-hidden">
      {/* Fixed Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          backdropFilter: "saturate(120%) blur(8px)",
        }}
        transition={{ duration: 0.3 }}
        className="flex-shrink-0 bg-[#2b2320]/80 border-b border-[#3a2f2d]/50 px-4 py-3 sm:px-6 sm:py-4"
      >
        <div className="flex items-center mb-3 sm:mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="mr-3 p-2 hover:bg-[#372a28]/60 rounded-lg transition-all duration-200 active:scale-95"
          >
            <Icon icon="material-symbols:arrow-back-ios-rounded" className="text-white text-lg sm:text-xl" />
          </button>
          <h1 className="font-semibold text-base sm:text-lg text-white">Report Updates</h1>
        </div>
        
        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                filter === option
                  ? "bg-[#372a28] text-white shadow-sm border border-[#4a3a38]"
                  : "text-[#8b7e79] hover:bg-[#2a1e1c]/60 hover:text-[#bfb2ac]"
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </motion.header>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 scrollbar-hide">
        <div className="max-w-2xl mx-auto">
          {loading ? (
            <div className="space-y-3">
              {Array(3).fill(0).map((_, i) => (
                <SkeletonBlock key={i} className="h-24 sm:h-28 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08 },
                },
              }}
              className="space-y-3"
            >
              {updates
                .filter((update) => filter === "all" || update.severity === filter)
                .length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <Icon icon="material-symbols:info-outline" className="text-4xl text-[#8b7e79] mb-3 mx-auto" />
                  <p className="text-[#8b7e79] text-sm">No updates found for the selected filter.</p>
                </motion.div>
              ) : (
                updates
                  .filter((update) => filter === "all" || update.severity === filter)
                  .map((update, index) => (
                    <UpdateCard key={index} {...update} />
                  ))
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}