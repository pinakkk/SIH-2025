import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

// Skeleton component
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`bg-[#2a2a2a] animate-pulse rounded-2xl ${className}`} />
);

const StatusBadge = ({ status }: { status: "warning" | "success" | "danger" }) => {
  const colors = {
    warning: "bg-yellow-500/15 text-yellow-400",
    success: "bg-green-500/15 text-green-400",
    danger: "bg-red-500/15 text-red-400",
  };

  return (
    <span className={`px-4 py-2 rounded-full text-xs font-medium ${colors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const DetailCard = ({ title, description, status, date, icon }: any) => (
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
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h3 className="font-semibold text-white text-lg sm:text-xl">{title}</h3>
              <StatusBadge status={status} />
            </div>
            <p className="text-base sm:text-lg text-[#bfb2ac] leading-relaxed mb-3">{description}</p>
            <p className="text-sm text-[#8b7e79]">{date}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export function ViewDetailsPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const details = [
    {
      title: "High Wave Warning",
      description: "Strong waves expected along the eastern coast. Height: 4-5 meters",
      status: "warning",
      date: "24 Sept 2025, 14:30 UTC",
      icon: <AlertTriangle size={24} className="text-[#e0d5ce]" />,
    },
    {
      title: "Evacuation Complete",
      description: "Successfully evacuated 500+ residents from coastal areas",
      status: "success",
      date: "24 Sept 2025, 12:15 UTC",
      icon: <CheckCircle size={24} className="text-[#e0d5ce]" />,
    },
    {
      title: "Road Closure Alert",
      description: "Marina Beach Road closed due to high tide warnings",
      status: "danger",
      date: "24 Sept 2025, 11:00 UTC",
      icon: <XCircle size={24} className="text-[#e0d5ce]" />,
    },
  ];

  return (
    <div className="bg-[#1f1816] h-screen overflow-hidden text-white font-sans flex flex-col">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          boxShadow: "0 8px 20px rgba(0,0,0,0.6)",
          backdropFilter: "saturate(120%) blur(6px)",
        }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-40 bg-[#2b2320]/55 border-b border-[#3a2f2d] px-4 sm:px-6 py-4 flex items-center flex-shrink-0"
      >
        <button 
          onClick={() => navigate(-1)}
          className="mr-3 sm:mr-4 p-2 hover:bg-[#372a28] rounded-full transition-colors duration-300"
        >
          <Icon icon="material-symbols:arrow-back-ios-rounded" className="text-white text-xl" />
        </button>
        <h1 className="font-bold text-lg sm:text-xl">View Details</h1>
      </motion.header>

      <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 sm:py-8">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="space-y-4 sm:space-y-6">
              {Array(3).fill(0).map((_, i) => (
                <SkeletonBlock key={i} className="h-32 sm:h-36 w-full" />
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
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="space-y-6 sm:space-y-8"
            >
              {details.map((detail, index) => (
                <DetailCard key={index} {...detail} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}