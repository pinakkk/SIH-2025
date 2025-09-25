import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import {
  MapPin,
  Menu,
  Phone,
  Info,
  Radio,
  MoreHorizontal,
} from "lucide-react";
import axios from "axios";

import { Icon } from "@iconify/react";
import { useAuth } from "@/hooks/use-auth";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProfileSidebar } from "@/components/layout/ProfileSidebar";
import { ROUTES } from "@/lib/constants";
import { NotificationButton, NotificationPanel } from "@/components/ui/NotificationPanel";
import { useNotifications } from "@/hooks/use-notifications";
import { useUserLocation } from "@/hooks/use-user-location";

// Skeleton Block
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`bg-[#2a2a2a] animate-pulse rounded-xl ${className}`} />
);

export function DashboardPage() {
  const userLocation = useUserLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileSidebarOpen, setProfileSidebarOpen] = useState(false);
  const [isNotificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [communityUpdates, setCommunityUpdates] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]); // new state for alerts

  // Notification hook
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAsUnread, 
    deleteNotification 
  } = useNotifications();

  useEffect(() => {
    async function fetchCommunityUpdates() {
      try {
        const res = await fetch("https://fast-api-f789.onrender.com/rank-posts");
        const data = await res.json();
        setCommunityUpdates(data.rankedPosts || []);
      } catch (err) {
        console.error("Error fetching community updates:", err);
      }
    }
    fetchCommunityUpdates();
  }, []);

  // fetch alerts
  useEffect(() => {
  async function fetchAlerts() {
    try {
      const res = await axios.get("http://localhost:5002/api/all-users-alert", {
        withCredentials: true, // ✅ send cookies/auth
      });
      
      setAlerts(res.data.alerts || []);
      
    } catch (err) {
      console.error("Error fetching alerts:", err);
    } finally {
      setTimeout(() => setLoading(false), 1500);
    }
  }
  fetchAlerts();
}, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#372a28]/80 hover:bg-[#443331] transition"
          >
            <Menu size={22} />
          </button>
          <div>
            <h1 className="font-bold text-lg">Rescue Saathi</h1>
            <p className="text-sm text-[#d8cdc6] flex items-center">
              <MapPin size={14} className="mr-1" /> {userLocation}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-3 relative"
        >
          <NotificationButton
            unreadCount={unreadCount}
            onClick={() => setNotificationPanelOpen(true)}
          />
          <button
            onClick={() => setProfileSidebarOpen(true)}
            className="flex items-center"
          >
            <img
              src={user?.photoURL || "https://i.pravatar.cc/40"}
              alt="profile"
              width={44}
              height={44}
              className="rounded-full object-cover border-2 border-[#2f2523]"
            />
          </button>
        </motion.div>
      </motion.header>
      <ProfileSidebar
        isOpen={isProfileSidebarOpen}
        onClose={() => setProfileSidebarOpen(false)}
      />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="px-5">
        {/* Alerts Section */}
        <div className="mt-5">
          {loading ? (
            <div className="mb-6">
              <SkeletonBlock className="h-14 w-full mb-3" />
              <SkeletonBlock className="h-48 w-full" />
            </div>
          ) : (
            alerts.map((alert, idx) => {
              const dt = new Date(alert.createdAt);
              const dateStr = dt.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              });
              const timeStr = dt.toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              });
              const severityColor =
                alert.severity === "critical"
                  ? "bg-red-500"
                  : alert.severity === "moderate"
                  ? "bg-yellow-500"
                  : "bg-green-500";

              return (
                <motion.div
                  key={alert._id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-[#2a1e1c] to-[#1e1614] border border-[#3a2f2d] rounded-2xl mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 ${severityColor}/15 rounded-full flex items-center justify-center mt-2`}>
                            <Icon
                              icon="mdi:alert"
                              className={`${severityColor.replace("bg-", "text-")} text-xl`}
                            />
                          </div>
                          <div className="mt-2">
                            <h2 className="font-semibold text-white text-sm sm:text-base leading-snug">
                              {alert.message}
                            </h2>
                            <p className="text-xs text-[#bfb2ac] mt-0.5">
                              Issued: {dateStr}, {timeStr}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Reporter: {alert.report?.user?.username || "Unknown"} | Hazard: {alert.report?.hazardType}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 mt-2">
                          <span className={`w-2.5 h-2.5 ${severityColor} rounded-full animate-pulse`} />
                          <span className="text-xs text-red-300 font-medium">
                            Live
                          </span>
                        </div>
                      </div>
                      {/* keep image/map section same */}
                      <div className="w-full h-44 bg-[#131212] rounded-xl overflow-hidden border border-[#3a2f2d] shadow-inner">
                        <img
                          src="https://i.imgur.com/AYp2z2A.png"
                          alt="Alert location map"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Quick Actions */}
        {/* ... rest of your code unchanged ... */}
      </div>

      <BottomNavigation />
      
      {/* Notification Panel */}
      <NotificationPanel
        isOpen={isNotificationPanelOpen}
        onClose={() => setNotificationPanelOpen(false)}
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onMarkAsUnread={markAsUnread}
        onDelete={deleteNotification}
        unreadCount={unreadCount}
      />
    </div>
  );
}

export default DashboardPage;
