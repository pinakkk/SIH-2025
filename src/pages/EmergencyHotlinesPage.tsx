import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

// Skeleton component
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`bg-[#2a2a2a] animate-pulse rounded-xl ${className}`} />
);

const HotlineCard = ({ name, number, description, icon }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-4"
  >
    <Card className="bg-gradient-to-b from-[#2a1e1c] to-[#1e1614] border border-[#3a2f2d] rounded-2xl shadow-lg">
      <CardContent className="p-6 sm:p-7">
        <div className="flex items-start space-x-5">
          <div className="p-4 bg-[#372a28] rounded-2xl flex items-center justify-center group-hover:bg-[#423330] transition-colors duration-300 flex-shrink-0 mt-4">
            {icon}
          </div>
          <div className="flex-1 min-w-0 pt-2">
            <h3 className="font-semibold text-white mb-3 text-lg sm:text-xl leading-tight">{name}</h3>
            <p className="text-base sm:text-lg font-bold text-red-400 mt-1">{number}</p>
            <p className="text-sm sm:text-base text-[#bfb2ac] mt-1 leading-relaxed">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export function EmergencyHotlinesPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const hotlines = [
    {
      name: "National Emergency",
      number: "112",
      description: "24/7 Unified emergency response service",
      icon: <Phone size={22} className="text-red-400" />,
    },
    {
      name: "Police",
      number: "100",
      description: "Law enforcement and emergency assistance",
      icon: <Phone size={22} className="text-red-400" />,
    },
    {
      name: "Fire Emergency",
      number: "101",
      description: "Fire and rescue services",
      icon: <Phone size={22} className="text-red-400" />,
    },
    {
      name: "Ambulance",
      number: "102",
      description: "Medical emergency services",
      icon: <Phone size={22} className="text-red-400" />,
    },
    {
      name: "Disaster Management",
      number: "108",
      description: "Natural and man-made disaster response",
      icon: <Phone size={22} className="text-red-400" />,
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
        <h1 className="font-bold text-lg">Emergency Hotlines</h1>
      </motion.header>

      <div className="px-5 py-6">
        {loading ? (
          Array(5).fill(0).map((_, i) => (
            <SkeletonBlock key={i} className="h-24 w-full mb-4" />
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
            {hotlines.map((hotline, index) => (
              <HotlineCard key={index} {...hotline} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}