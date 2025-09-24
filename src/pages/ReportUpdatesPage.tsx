import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Radio, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

// Skeleton component
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`bg-[#2a2a2a] animate-pulse rounded-2xl ${className}`} />
);

const UpdateCard = ({ title, description, location, time, severity, icon }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className="transform transition-transform duration-300"
  >
    <Card className="bg-gradient-to-b from-[#2a1e1c] to-[#1e1614] border border-[#3a2f2d] rounded-2xl shadow-lg hover:border-[#4a3f3d] hover:shadow-xl transition-all duration-300 cursor-pointer group">
      <CardContent className="p-6 sm:p-7">
        <div className="flex items-start space-x-5">
         <div className="p-5 bg-[#372a28] rounded-2xl flex items-center justify-center group-hover:bg-[#423330] transition-colors duration-300 flex-shrink-0 mt-4">
            {icon}
          </div>
          <div className="flex-1 min-w-0 pt-2">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h3 className="font-semibold text-white text-lg sm:text-xl leading-tight">{title}</h3>
              <span className={`px-4 py-2 rounded-full text-xs font-medium ${
                severity === 'high' ? 'bg-red-500/15 text-red-400' :
                severity === 'medium' ? 'bg-yellow-500/15 text-yellow-400' :
                'bg-green-500/15 text-green-400'
              }`}>
                {severity.charAt(0).toUpperCase() + severity.slice(1)}
              </span>
            </div>
            <p className="text-base sm:text-lg text-[#bfb2ac] leading-relaxed mb-3">{description}</p>
            <div className="flex items-center justify-between text-sm text-[#8b7e79] gap-2">
              <span className="flex items-center gap-2">
                <Icon icon="material-symbols:location-on-outline" className="text-[#e0d5ce]" />
                {location}
              </span>
              <span className="flex items-center gap-2">
                <Icon icon="material-symbols:schedule-outline" className="text-[#e0d5ce]" />
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
      icon: <AlertCircle size={24} className="text-[#e0d5ce]" />,
    },
    {
      title: "Flood Alert Update",
      description: "Water levels rising in Krishna River. Monitoring situation closely.",
      location: "Krishna Basin",
      time: "4 hours ago",
      severity: "medium",
      icon: <Radio size={24} className="text-[#e0d5ce]" />,
    },
    {
      title: "Weather Update",
      description: "Heavy rainfall expected in the next 48 hours. Stay prepared.",
      location: "Coastal Region",
      time: "6 hours ago",
      severity: "low",
      icon: <Radio size={24} className="text-[#e0d5ce]" />,
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
          boxShadow: "0 8px 20px rgba(0,0,0,0.6)",
          backdropFilter: "saturate(120%) blur(6px)",
        }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-40 bg-[#2b2320]/55 border-b border-[#3a2f2d] px-4 sm:px-6 py-4 flex flex-col flex-shrink-0"
      >
        <div className="flex items-center mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="mr-3 sm:mr-4 p-2 hover:bg-[#372a28] rounded-full transition-colors duration-300"
          >
            <Icon icon="material-symbols:arrow-back-ios-rounded" className="text-white text-xl" />
          </button>
          <h1 className="font-bold text-lg sm:text-xl">Report Updates</h1>
        </div>
        
        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                filter === option
                  ? "bg-[#372a28] text-white shadow-lg border border-[#4a3f3d]"
                  : "text-[#8b7e79] hover:bg-[#2a1e1c] hover:text-[#bfb2ac] hover:border-[#3a2f2d]"
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </motion.header>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 sm:py-8">
        <div className="max-w-3xl mx-auto">
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