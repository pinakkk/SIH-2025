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
import {
  NotificationButton,
  NotificationPanel,
} from "@/components/ui/NotificationPanel";
import { useNotifications } from "@/hooks/use-notifications";
import { useUserLocation } from "@/hooks/use-user-location";

// ✅ Google Maps API key from env
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// ✅ Dark theme style query for Google Static Maps
const darkMapStyleQuery =
  "style=element:geometry%7Ccolor:0x1d1d1d&style=element:labels.text.fill%7Ccolor:0xffffff&style=element:labels.text.stroke%7Ccolor:0x1d1d1d&style=feature:road%7Celement:geometry%7Ccolor:0x2c2c2c";

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
  const [alerts, setAlerts] = useState<any[]>([]);

  // Notification hook
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAsUnread,
    deleteNotification,
    clearAll,
    markAllAsRead,
  } = useNotifications();

  // Fetch community updates
  useEffect(() => {
    async function fetchCommunityUpdates() {
      try {
        const res = await fetch(
          "https://fast-api-f789.onrender.com/rank-posts"
        );
        const data = await res.json();
        setCommunityUpdates(data.rankedPosts || []);
      } catch (err) {
        console.error("Error fetching community updates:", err);
      }
    }
    fetchCommunityUpdates();
  }, []);

  // Fetch alerts
  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await axios.get(
          // "http://localhost:5002/api/all-users-alert", // Local host 
          "https://sih-2025-l3ur.onrender.com/all-users-alert", // production
          {
            withCredentials: true,
          }
        );
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
                          <div
                            className={`p-2 ${severityColor}/15 rounded-full flex items-center justify-center mt-2`}
                          >
                            <Icon
                              icon="mdi:alert"
                              className={`${severityColor.replace(
                                "bg-",
                                "text-"
                              )} text-xl`}
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
                              Reporter:{" "}
                              {alert.report?.user?.username || "Unknown"} |
                              Hazard: {alert.report?.hazardType}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 mt-2">
                          <span
                            className={`w-2.5 h-2.5 ${severityColor} rounded-full animate-pulse`}
                          />
                          <span className="text-xs text-red-300 font-medium">
                            Live
                          </span>
                        </div>
                      </div>
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

        {/* Community Updates */}
         <div className="mb-4 mt-8">
          <h2 className="font-semibold text-lg mb-4">Community Updates</h2>
        </div>

        {!loading && (
          <div>
            {communityUpdates.map((update, idx) => {
              let timeDisplay = "";
              let dateDisplay = "";

              if (update.createdAt) {
                const dt = new Date(update.createdAt);
                timeDisplay = dt.toLocaleTimeString("en-IN", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: "Asia/Kolkata",
                });
                dateDisplay = dt.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  timeZone: "Asia/Kolkata",
                });
              }

              const markerColor =
                update.status === "Marked Safe" ? "green" : "red";
              const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${update.location.coordinates[1]},${update.location.coordinates[0]}&zoom=13&size=600x300&markers=color:${markerColor}%7C${update.location.coordinates[1]},${update.location.coordinates[0]}&${darkMapStyleQuery}&key=${GOOGLE_MAPS_API_KEY}`;

              return (
                <motion.div
                  key={update.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <Card className="bg-gradient-to-b from-[#29201e] to-[#1d1514] border border-[#3a2f2d] rounded-2xl mb-6 shadow-[0_6px_20px_rgba(0,0,0,0.45)]">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-5">
                        <div className="flex items-center gap-3 mt-1">
                          <img
                            src={
                              update.user?.profilePic ||
                              `https://i.pravatar.cc/40?u=${idx}`
                            }
                            alt="profile"
                            width={50}
                            height={50}
                            className="rounded-full border-2 border-[#3a2f2d] shadow-sm mt-1"
                          />
                          <div className="mt-1">
                            <p className="font-semibold text-white text-sm leading-tight">
                              {update.user?.username || "Anonymous"}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {update.verified
                                ? "✅ Verified Report"
                                : "⚠️ Unverified"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end mt-2">
                          <span className="text-sm font-medium text-gray-200">
                            {timeDisplay.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500">
                            {dateDisplay}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-[#e0d6d0] mb-4 leading-snug">
                        {update.caption}
                      </p>

                      {update.location?.coordinates && GOOGLE_MAPS_API_KEY && (
                        <div className="w-full h-40 bg-[#131212] rounded-xl overflow-hidden mb-4 border border-[#3a2f2d]">
                          <img
                            src={mapUrl}
                            alt="Map Preview of the report location"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="flex gap-3">
                        <button className="flex-1 py-2 rounded-xl bg-[#2e2a28] text-white font-medium text-sm border border-[#3a2f2d] hover:bg-[#403633] transition">
                          ✅ Safe
                        </button>
                        <button className="flex-1 py-2 rounded-xl bg-[#2e2a28] text-white font-medium text-sm border border-[#3a2f2d] hover:bg-[#403633] transition">
                          ⚠️ Not Safe
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/community/${update.id || idx}`, {
                              state: update,
                            })
                          }
                          className="flex-1 py-2 rounded-xl bg-[#2e2a28] text-white font-medium text-sm border border-[#3a2f2d] hover:bg-[#403633] transition"
                        >
                          View Details
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
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
        onClearAll={clearAll}
        onMarkAllAsRead={markAllAsRead}
        unreadCount={unreadCount}
      />
    </div>
  );
}

export default DashboardPage;
