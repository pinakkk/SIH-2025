import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { 
  Settings, 
  MessageCircle, 
  Map, 
  Phone,
  Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

// Skeleton component
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`bg-[#2a2a2a] animate-pulse rounded-2xl ${className}`} />
);

const FeatureCard = ({ title, description, icon, onClick }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className="transform transition-transform duration-300"
    onClick={onClick}
  >
    <Card className="bg-gradient-to-b from-[#2a1e1c] to-[#1e1614] border border-[#3a2f2d] rounded-2xl shadow-lg hover:border-[#4a3f3d] hover:shadow-xl transition-all duration-300 cursor-pointer group">
      <CardContent className="p-6 sm:p-7">
        <div className="flex items-start space-x-5">
          <div className="p-5 bg-[#372a28] rounded-2xl flex items-center justify-center group-hover:bg-[#423330] transition-colors duration-300 flex-shrink-0 mt-4">
            {icon}
          </div>
          <div className="flex-1 min-w-0 pt-2">
            <h3 className="font-semibold text-white mb-3 text-lg sm:text-xl leading-tight">{title}</h3>
            <p className="text-base sm:text-lg text-[#bfb2ac] leading-relaxed">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export function SeeMorePage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const features = [
    {
      title: "Emergency Settings",
      description: "Configure emergency contacts and alert preferences",
      icon: <Settings size={24} className="text-[#e0d5ce]" />,
      path: "/emergency-settings"
    },
    {
      title: "Community Chat",
      description: "Connect with your local community during emergencies",
      icon: <MessageCircle size={24} className="text-[#e0d5ce]" />,
      path: "/community"
    },
    {
      title: "Hazard Map",
      description: "View real-time hazard zones and safe areas",
      icon: <Map size={24} className="text-[#e0d5ce]" />,
      path: "/dashboard/live-hazard-map"
    },
    // {
    //   title: "Emergency Contacts",
    //   description: "Manage your emergency contact list",
    //   icon: <Phone size={24} className="text-[#e0d5ce]" />,
    //   path: "/emergency-contacts"
    // },
    // {
    //   title: "Alert History",
    //   description: "View past emergency alerts and notifications",
    //   icon: <Bell size={24} className="text-[#e0d5ce]" />,
    //   path: "/alerts"
    // }
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
        <h1 className="font-bold text-lg sm:text-xl">More Features</h1>
      </motion.header>

      <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 sm:py-8">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="space-y-4 sm:space-y-6">
              {Array(5).fill(0).map((_, i) => (
                <SkeletonBlock key={i} className="h-24 sm:h-28 w-full" />
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
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  {...feature}
                  onClick={() => navigate(feature.path)}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}