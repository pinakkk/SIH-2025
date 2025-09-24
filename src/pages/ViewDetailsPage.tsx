import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

// Skeleton component
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`bg-[#2a2a2a] animate-pulse rounded-xl ${className}`} />
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
    className="mb-6"
  >
    <Card className="bg-gradient-to-b from-[#2a1e1c] to-[#1e1614] border border-[#3a2f2d] rounded-2xl shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-4 bg-[#372a28] rounded-full flex items-center justify-center">
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white text-lg">{title}</h3>
              <StatusBadge status={status} />
            </div>
            <p className="text-sm text-[#bfb2ac] mb-3 leading-relaxed">{description}</p>
            <p className="text-xs text-[#8b7e79]">{date}</p>
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
      icon: <AlertTriangle size={22} className="text-yellow-400" />,
    },
    {
      title: "Evacuation Complete",
      description: "Successfully evacuated 500+ residents from coastal areas",
      status: "success",
      date: "24 Sept 2025, 12:15 UTC",
      icon: <CheckCircle size={22} className="text-green-400" />,
    },
    {
      title: "Road Closure Alert",
      description: "Marina Beach Road closed due to high tide warnings",
      status: "danger",
      date: "24 Sept 2025, 11:00 UTC",
      icon: <XCircle size={22} className="text-red-400" />,
    },
  ];

  return (
    <div className="bg-[#1f1816] min-h-screen text-white pb-28 font-sans">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          boxShadow: "0 8px 20px rgba(0,0,0,0.6)",
          backdropFilter: "saturate(120%) blur(6px)",
        }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-40 bg-[#2b2320]/55 border-b border-[#3a2f2d] px-5 py-4 flex items-center"
      >
        <button 
          onClick={() => navigate(-1)}
          className="mr-4 p-2 hover:bg-[#372a28] rounded-full transition-colors"
        >
          <Icon icon="material-symbols:arrow-back-ios-rounded" className="text-white text-xl" />
        </button>
        <h1 className="font-bold text-lg">View Details</h1>
      </motion.header>

      <div className="px-5 py-6">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <SkeletonBlock key={i} className="h-32 w-full mb-4" />
          ))
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
          >
            {details.map((detail, index) => (
              <DetailCard key={index} {...detail} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}