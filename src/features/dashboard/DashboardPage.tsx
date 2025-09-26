// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/Card";
// import { MapPin, Menu } from "lucide-react";
// import axios from "axios";
// import { Icon } from "@iconify/react";
// import { useAuth } from "@/hooks/use-auth";
// import { BottomNavigation } from "@/components/layout/BottomNavigation";
// import { useNavigate } from "react-router-dom";
// import { Sidebar } from "@/components/layout/Sidebar";
// import { ProfileSidebar } from "@/components/layout/ProfileSidebar";
// import {
//   NotificationButton,
//   NotificationPanel,
// } from "@/components/ui/NotificationPanel";
// import { useNotifications } from "@/hooks/use-notifications";
// import { useUserLocation } from "@/hooks/use-user-location";

// // ✅ Google Maps API key
// const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// // ✅ Dark theme map style
// const darkMapStyleQuery =
//   "style=element:geometry%7Ccolor:0x1d1d1d&style=element:labels.text.fill%7Ccolor:0xffffff&style=element:labels.text.stroke%7Ccolor:0x1d1d1d&style=feature:road%7Celement:geometry%7Ccolor:0x2c2c2c";

// // ✅ API Base URLs (Local & Production)
// const API_BASE = "https://sih-2025-l3ur.onrender.com"
// //"http://localhost:5002/api"
// //"https://sih-2025-l3ur.onrender.com";

// const COMMUNITY_BASE = "https://fast-api-f789.onrender.com"
// // "http://localhost:5001"
// // "https://fast-api-f789.onrender.com";

// // ✅ Skeleton Loader
// const SkeletonBlock = ({ className = "" }: { className?: string }) => (
//   <div className={`bg-[#2a2a2a] animate-pulse rounded-xl ${className}`} />
// );

// export function DashboardPage() {
//   const userLocation = useUserLocation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [scrolled, setScrolled] = useState(false);
//   const { user } = useAuth();
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [isProfileSidebarOpen, setProfileSidebarOpen] = useState(false);
//   const [isNotificationPanelOpen, setNotificationPanelOpen] = useState(false);
//   const [communityUpdates, setCommunityUpdates] = useState<any[]>([]);
//   const [alerts, setAlerts] = useState<any[]>([]);

//   // ✅ Notifications
//   const {
//     notifications,
//     unreadCount,
//     markAsRead,
//     markAsUnread,
//     deleteNotification,
//     clearAll,
//     markAllAsRead,
//   } = useNotifications();

//   // ✅ Fetch community updates
//   useEffect(() => {
//     async function fetchCommunityUpdates() {
//       try {
//         const res = await fetch(`${COMMUNITY_BASE}/rank-posts`);
//         const data = await res.json();
//         setCommunityUpdates(data.rankedPosts || []);
//       } catch (err) {
//         console.error("Error fetching community updates:", err);
//       }
//     }
//     fetchCommunityUpdates();
//   }, []);

//   // ✅ Fetch alerts
//   useEffect(() => {
//     async function fetchAlerts() {
//       try {
//         const res = await axios.get('http://localhost:5002/api/all-users-alert', {
//           withCredentials: true,
//         });
//         setAlerts(res.data.alerts || []);
//       } catch (err) {
//         console.error("Error fetching alerts:", err);
//       } finally {
//         setTimeout(() => setLoading(false), 1500);
//       }
//     }
//     fetchAlerts();
//   }, []);

//   // ✅ Scroll detection
//   useEffect(() => {
//     function onScroll() {
//       setScrolled(window.scrollY > 8);
//     }
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // ✅ Map severity to marker colors
//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "critical":
//         return "red";
//       case "high":
//         return "orange";
//       case "medium":
//         return "yellow";
//       case "low":
//         return "green";
//       default:
//         return "blue";
//     }
//   };

//   return (
//     <div className="bg-[#1f1816] min-h-screen text-white pb-28 font-sans">
//       {/* Header */}
//       <motion.header
//         animate={{
//           boxShadow: scrolled
//             ? "0 8px 20px rgba(0,0,0,0.6)"
//             : "0 2px 6px rgba(0,0,0,0.25)",
//           backdropFilter: "saturate(120%) blur(6px)",
//         }}
//         transition={{ duration: 0.2 }}
//         className="sticky top-0 z-40 bg-[#2b2320]/55 border-b border-[#3a2f2d] px-5 py-4 flex justify-between items-center"
//       >
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#372a28]/80 hover:bg-[#443331] transition"
//           >
//             <Menu size={22} />
//           </button>
//           <div>
//             <h1 className="font-bold text-lg lg:text-xl">Rescue Saathi</h1>
//             <p className="text-sm text-[#d8cdc6] flex items-center">
//               <MapPin size={14} className="mr-1" /> {userLocation}
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3 relative">
//           <NotificationButton
//             unreadCount={unreadCount}
//             onClick={() => setNotificationPanelOpen(true)}
//           />
//           <button
//             onClick={() => setProfileSidebarOpen(true)}
//             className="flex items-center"
//           >
//             <img
//               src={user?.photoURL || "https://i.pravatar.cc/40"}
//               alt="profile"
//               width={44}
//               height={44}
//               className="rounded-full object-cover border-2 border-[#2f2523]"
//             />
//           </button>
//         </div>
//       </motion.header>

//       {/* Sidebars */}
//       <ProfileSidebar
//         isOpen={isProfileSidebarOpen}
//         onClose={() => setProfileSidebarOpen(false)}
//       />
//       <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

//       {/* Alerts Section */}
//       <div className="px-5 lg:px-20 xl:px-40">
//         <div className="mt-5">
//           {loading ? (
//             <div className="mb-6">
//               <SkeletonBlock className="h-14 w-full mb-3" />
//               <SkeletonBlock className="h-48 w-full" />
//             </div>
//           ) : (
//             alerts.map((alert, idx) => {
//               const dt = new Date(alert.createdAt);
//               const dateStr = dt.toLocaleDateString("en-IN", {
//                 day: "numeric",
//                 month: "short",
//               });
//               const timeStr = dt.toLocaleTimeString("en-IN", {
//                 hour: "numeric",
//                 minute: "2-digit",
//                 hour12: true,
//               });
//               const severityColor =
//                 alert.severity === "critical"
//                   ? "bg-red-500"
//                   : alert.severity === "high"
//                     ? "bg-orange-500"
//                     : alert.severity === "medium"
//                       ? "bg-yellow-500"
//                       : "bg-green-500";

//               const markerColor = getSeverityColor(alert.severity);
//               const mapUrl =
//                 alert.postLocation?.coordinates && GOOGLE_MAPS_API_KEY
//                   ? `https://maps.googleapis.com/maps/api/staticmap?center=${alert.postLocation.coordinates[1]},${alert.postLocation.coordinates[0]}&zoom=14&size=600x300&markers=color:${markerColor}%7C${alert.postLocation.coordinates[1]},${alert.postLocation.coordinates[0]}&${darkMapStyleQuery}&key=${GOOGLE_MAPS_API_KEY}`
//                   : null;

//               return (
//                 <motion.div
//                   key={alert._id || idx}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.4, delay: idx * 0.1 }}
//                 >
//                   <Card className="bg-gradient-to-br from-[#2a1e1c] to-[#1e1614] border border-[#3a2f2d] rounded-2xl mb-6 shadow-lg">
//                     <CardContent className="p-5">
//                       <div className="flex items-center justify-between mb-4 flex-wrap lg:flex-nowrap">
//                         <div className="flex items-center gap-3">
//                           <div
//                             className={`p-2 ${severityColor}/15 rounded-full flex items-center justify-center mt-2`}
//                           >
//                             <Icon
//                               icon="mdi:alert"
//                               className={`${severityColor.replace(
//                                 "bg-",
//                                 "text-"
//                               )} text-xl`}
//                             />
//                           </div>
//                           <div className="mt-2">
//                             <h2 className="font-semibold text-white text-sm sm:text-base lg:text-lg">
//                               {alert.message}
//                             </h2>
//                             <p className="text-xs text-[#bfb2ac]">
//                               Issued: {dateStr}, {timeStr}
//                             </p>
//                             <p className="text-xs text-gray-400">
//                               Reporter: {alert.report?.user?.username || "Unknown"} |{" "}
//                               Hazard: {alert.report?.hazardType}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-1.5 mt-2">
//                           <span
//                             className={`w-2.5 h-2.5 ${severityColor} rounded-full animate-pulse`}
//                           />
//                           <span className="text-xs text-red-300 font-medium">
//                             Live
//                           </span>
//                         </div>
//                       </div>

//                       {mapUrl && (
//                         <div className="w-full h-52 lg:h-64 rounded-xl overflow-hidden border border-[#3a2f2d]">
//                           <img
//                             src={mapUrl}
//                             alt="Alert location map"
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                       )}
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               );
//             })
//           )}
//         </div>

//         {/* Community Updates */}
//         <div className="mb-4 mt-8">
//           <h2 className="font-semibold text-lg lg:text-xl mb-4">
//             Community Updates
//           </h2>
//         </div>

//         {!loading && (
//           <div className="grid gap-6 lg:grid-cols-2">
//             {communityUpdates.map((update, idx) => {
//               let timeDisplay = "";
//               let dateDisplay = "";

//               if (update.createdAt) {
//                 const dt = new Date(update.createdAt);
//                 timeDisplay = dt.toLocaleTimeString("en-IN", {
//                   hour: "numeric",
//                   minute: "2-digit",
//                   hour12: true,
//                 });
//                 dateDisplay = dt.toLocaleDateString("en-IN", {
//                   day: "numeric",
//                   month: "short",
//                 });
//               }

//               const markerColor =
//                 update.status === "Marked Safe" ? "green" : "red";
//               const mapUrl =
//                 update.location?.coordinates && GOOGLE_MAPS_API_KEY
//                   ? `https://maps.googleapis.com/maps/api/staticmap?center=${update.location.coordinates[1]},${update.location.coordinates[0]}&zoom=13&size=600x300&markers=color:${markerColor}%7C${update.location.coordinates[1]},${update.location.coordinates[0]}&${darkMapStyleQuery}&key=${GOOGLE_MAPS_API_KEY}`
//                   : null;

//               return (
//                 <motion.div
//                   key={update.id || idx}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.4, delay: idx * 0.1 }}
//                 >
//                   <Card className="bg-gradient-to-b from-[#29201e] to-[#1d1514] border border-[#3a2f2d] rounded-2xl shadow-lg">
//                     <CardContent className="p-5">
//                       <div className="flex justify-between items-start mb-5">
//                         <div className="flex items-center gap-3 mt-1">
//                           <img
//                             src={
//                               update.user?.profilePic ||
//                               `https://i.pravatar.cc/40?u=${idx}`
//                             }
//                             alt="profile"
//                             width={50}
//                             height={50}
//                             className="rounded-full border-2 border-[#3a2f2d]"
//                           />
//                           <div>
//                             <p className="font-semibold text-white text-sm lg:text-base">
//                               {update.user?.username || "Anonymous"}
//                             </p>
//                             <p className="text-xs text-gray-400">
//                               {update.verified
//                                 ? "✅ Verified Report"
//                                 : "⚠️ Unverified"}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex flex-col items-end mt-2">
//                           <span className="text-sm font-medium text-gray-200">
//                             {timeDisplay.toUpperCase()}
//                           </span>
//                           <span className="text-xs text-gray-500">
//                             {dateDisplay}
//                           </span>
//                         </div>
//                       </div>

//                       <p className="text-sm lg:text-base text-[#e0d6d0] mb-4">
//                         {update.caption}
//                       </p>

//                       {mapUrl && (
//                         <div className="w-full h-40 lg:h-52 rounded-xl overflow-hidden mb-4 border border-[#3a2f2d]">
//                           <img
//                             src={mapUrl}
//                             alt="Map Preview"
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                       )}

//                       {/* ✅ Only View Details */}
//                       <div className="flex">
//                         <button
//                           onClick={() =>
//                             navigate(`/community/${update.id || idx}`, { state: update })
//                           }
//                           className="flex-1 py-2 rounded-xl  bg-white text-black font-medium text-sm lg:text-base border border-[#3a2f2d] hover:bg-[#403633] transition"
//                         >
//                           View Details
//                         </button>

//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Bottom Navigation */}
//       <BottomNavigation />

//       {/* Notification Panel */}
//       <NotificationPanel
//         isOpen={isNotificationPanelOpen}
//         onClose={() => setNotificationPanelOpen(false)}
//         notifications={notifications}
//         onMarkAsRead={markAsRead}
//         onMarkAsUnread={markAsUnread}
//         onDelete={deleteNotification}
//         onClearAll={clearAll}
//         onMarkAllAsRead={markAllAsRead}
//         unreadCount={unreadCount}
//       />
//     </div>
//   );
// }

// export default DashboardPage;


// // Working Properly Version
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/Card";
// import { MapPin, Menu } from "lucide-react";
// import axios from "axios";
// import { Icon } from "@iconify/react";
// import { useAuth } from "@/hooks/use-auth";
// import { BottomNavigation } from "@/components/layout/BottomNavigation";
// import { Route, useNavigate } from "react-router-dom";
// import { Sidebar } from "@/components/layout/Sidebar";
// import { ProfileSidebar } from "@/components/layout/ProfileSidebar";
// import {
//   NotificationButton,
//   NotificationPanel,
// } from "@/components/ui/NotificationPanel";
// import { useNotifications } from "@/hooks/use-notifications";
// import { useUserLocation } from "@/hooks/use-user-location";
// import { ROUTES } from "@/lib/constants";

// // ✅ Google Maps API key
// const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// // ✅ Dark theme map style
// const darkMapStyleQuery =
//   "style=element:geometry%7Ccolor:0x1d1d1d&style=element:labels.text.fill%7Ccolor:0xffffff&style=element:labels.text.stroke%7Ccolor:0x1d1d1d&style=feature:road%7Celement:geometry%7Ccolor:0x2c2c2c";

// // ✅ API Base URLs
// const API_BASE = "https://sih-2025-l3ur.onrender.com";
// const COMMUNITY_BASE = "https://fast-api-f789.onrender.com";

// // ✅ Skeleton Loader
// const SkeletonBlock = ({ className = "" }: { className?: string }) => (
//   <div className={`bg-[#2a2a2a] animate-pulse rounded-xl ${className}`} />
// );

// export function DashboardPage() {
//   const userLocation = useUserLocation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [scrolled, setScrolled] = useState(false);
//   const { user } = useAuth();
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [isProfileSidebarOpen, setProfileSidebarOpen] = useState(false);
//   const [isNotificationPanelOpen, setNotificationPanelOpen] = useState(false);
//   const [communityUpdates, setCommunityUpdates] = useState<any[]>([]);
//   const [alerts, setAlerts] = useState<any[]>([]);

//   // ✅ Notifications
//   const {
//     notifications,
//     unreadCount,
//     markAsRead,
//     markAsUnread,
//     deleteNotification,
//     clearAll,
//     markAllAsRead,
//   } = useNotifications();

//   // ✅ Fetch community updates
//   useEffect(() => {
//     async function fetchCommunityUpdates() {
//       try {
//         const res = await fetch(`${COMMUNITY_BASE}/rank-posts`);
//         const data = await res.json();
//         setCommunityUpdates(data.rankedPosts || []);
//       } catch (err) {
//         console.error("Error fetching community updates:", err);
//       }
//     }
//     fetchCommunityUpdates();
//   }, []);

//   // ✅ Fetch alerts
//   useEffect(() => {
//     async function fetchAlerts() {
//       try {
//         const res = await axios.get("http://localhost:5002/api/all-users-alert", {
//           withCredentials: true,
//         });
//         setAlerts(res.data.alerts || []);
//       } catch (err) {
//         console.error("Error fetching alerts:", err);
//       } finally {
//         setTimeout(() => setLoading(false), 1500);
//       }
//     }
//     fetchAlerts();
//   }, []);

//   // ✅ Scroll detection
//   useEffect(() => {
//     function onScroll() {
//       setScrolled(window.scrollY > 8);
//     }
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // ✅ Map severity to marker colors
//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "critical":
//         return "red";
//       case "high":
//         return "orange";
//       case "medium":
//         return "yellow";
//       case "low":
//         return "green";
//       default:
//         return "blue";
//     }
//   };

//   return (
//     <div className="bg-[#1f1816] min-h-screen text-white pb-28 font-sans">
//       {/* Header */}
//       <motion.header
//         animate={{
//           boxShadow: scrolled
//             ? "0 8px 20px rgba(0,0,0,0.6)"
//             : "0 2px 6px rgba(0,0,0,0.25)",
//           backdropFilter: "saturate(120%) blur(6px)",
//         }}
//         transition={{ duration: 0.2 }}
//         className="sticky top-0 z-40 bg-[#2b2320]/55 border-b border-[#3a2f2d] px-5 py-4 flex justify-between items-center"
//       >
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#372a28]/80 hover:bg-[#443331] transition"
//           >
//             <Menu size={22} />
//           </button>
//           <div>
//             <h1 className="font-bold text-lg lg:text-xl">Rescue Saathi</h1>
//             <p className="text-sm text-[#d8cdc6] flex items-center">
//               <MapPin size={14} className="mr-1" /> {userLocation}
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3 relative">
//           <NotificationButton
//             unreadCount={unreadCount}
//             onClick={() => setNotificationPanelOpen(true)}
//           />
//           <button
//             onClick={() => setProfileSidebarOpen(true)}
//             className="flex items-center"
//           >
//             <img
//               src={user?.photoURL || "https://i.pravatar.cc/40"}
//               alt="profile"
//               width={44}
//               height={44}
//               className="rounded-full object-cover border-2 border-[#2f2523]"
//             />
//           </button>
//         </div>
//       </motion.header>

//       {/* Sidebars */}
//       <ProfileSidebar
//         isOpen={isProfileSidebarOpen}
//         onClose={() => setProfileSidebarOpen(false)}
//       />
//       <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

//       {/* Alerts Section (only if alerts exist) */}
//       {alerts.length > 0 && (
//         <div className="px-5 lg:px-20 xl:px-40">
//           <h2 className="font-semibold text-lg lg:text-xl mt-6 mb-4">
//             Active Alerts
//           </h2>

//           <div className="mt-2">
//             {loading ? (
//               <div className="mb-6">
//                 <SkeletonBlock className="h-14 w-full mb-3" />
//                 <SkeletonBlock className="h-48 w-full" />
//               </div>
//             ) : (
//               alerts.map((alert, idx) => {
//                 const dt = new Date(alert.createdAt);
//                 const dateStr = dt.toLocaleDateString("en-IN", {
//                   day: "numeric",
//                   month: "short",
//                 });
//                 const timeStr = dt.toLocaleTimeString("en-IN", {
//                   hour: "numeric",
//                   minute: "2-digit",
//                   hour12: true,
//                 });
//                 const severityColor =
//                   alert.severity === "critical"
//                     ? "bg-red-500"
//                     : alert.severity === "high"
//                       ? "bg-orange-500"
//                       : alert.severity === "medium"
//                         ? "bg-yellow-500"
//                         : "bg-green-500";

//                 const markerColor = getSeverityColor(alert.severity);
//                 const mapUrl =
//                   alert.postLocation?.coordinates && GOOGLE_MAPS_API_KEY
//                     ? `https://maps.googleapis.com/maps/api/staticmap?center=${alert.postLocation.coordinates[1]},${alert.postLocation.coordinates[0]}&zoom=14&size=600x300&markers=color:${markerColor}%7C${alert.postLocation.coordinates[1]},${alert.postLocation.coordinates[0]}&${darkMapStyleQuery}&key=${GOOGLE_MAPS_API_KEY}`
//                     : null;

//                 return (
//                   <motion.div
//                     key={alert._id || idx}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.4, delay: idx * 0.1 }}
//                   >
//                     <Card className="bg-gradient-to-br from-[#2a1e1c] to-[#1e1614] border border-[#3a2f2d] rounded-2xl mb-6 shadow-lg">
//                       <CardContent className="p-5">
//                         <div className="flex items-center justify-between mb-4 flex-wrap lg:flex-nowrap">
//                           <div className="flex items-center gap-3">
//                             <div
//                               className={`p-2 ${severityColor}/15 rounded-full flex items-center justify-center mt-2`}
//                             >
//                               <Icon
//                                 icon="mdi:alert"
//                                 className={`${severityColor.replace(
//                                   "bg-",
//                                   "text-"
//                                 )} text-xl`}
//                               />
//                             </div>
//                             <div className="mt-2">
//                               <h2 className="font-semibold text-white text-sm sm:text-base lg:text-lg">
//                                 {alert.message}
//                               </h2>
//                               <p className="text-xs text-[#bfb2ac]">
//                                 Issued: {dateStr}, {timeStr}
//                               </p>
//                               <p className="text-xs text-gray-400">
//                                 Reporter:{" "}
//                                 {alert.report?.user?.username || "Unknown"} |{" "}
//                                 Hazard: {alert.report?.hazardType}
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-1.5 mt-2">
//                             <span
//                               className={`w-2.5 h-2.5 ${severityColor} rounded-full animate-pulse`}
//                             />
//                             <span className="text-xs text-red-300 font-medium">
//                               Live
//                             </span>
//                           </div>
//                         </div>

//                         {mapUrl && (
//                           <div className="w-full h-52 lg:h-64 rounded-xl overflow-hidden border border-[#3a2f2d]">
//                             <img
//                               src={mapUrl}
//                               alt="Alert location map"
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                         )}
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 );
//               })
//             )}
//           </div>

//           {/* ✅ Quick Actions */}
//           {!loading && (
//             <div className="grid grid-cols-4 gap-3 my-6 text-center">
//               {[
//                 {
//                   icon: <Icon icon="mdi:phone" className="text-xl" />,
//                   label: "Emergency\nHotlines",
//                   route: ROUTES.EMERGENCY_HOTLINES,  // ✅ lowercase route
//                 },
//                 {
//                   icon: <Icon icon="mdi:information" className="text-xl" />,
//                   label: "View\nUpdates",
//                   route: ROUTES.VIEW_DETAILS,
//                 },
//                 {
//                   icon: <Icon icon="mdi:radio-handheld" className="text-xl" />,
//                   label: "See\nHotspots",
//                   route: ROUTES.LIVE_HAZARD_MAP,
//                 },
//                 {
//                   icon: <Icon icon="mdi:dots-horizontal" className="text-xl" />,
//                   label: "See\nMore",
//                   route: ROUTES.SEE_MORE,
//                 },
//               ].map((it, idx) => (
//                 <div
//                   key={idx}
//                   onClick={() => navigate(it.route)}   // ✅ move here
//                   className="flex flex-col items-center gap-1 cursor-pointer"
//                 >
//                   <div className="p-3 rounded-full bg-[#2a2a2a] w-14 h-14 flex items-center justify-center hover:scale-105 transition-transform">
//                     {it.icon}
//                   </div>
//                   <p className="text-xs leading-tight whitespace-pre-line text-[#d8cdc6]">
//                     {it.label}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}

//         </div>
//       )}

//       {/* Community Updates */}
//       <div className="px-5 lg:px-20 xl:px-40">
//         <div className="mb-4 mt-8">
//           <h2 className="font-semibold text-lg lg:text-xl mb-4">
//             Community Updates
//           </h2>
//         </div>

//         {!loading && (
//           <div className="grid gap-6 lg:grid-cols-2">
//             {communityUpdates.map((update, idx) => {
//               let timeDisplay = "";
//               let dateDisplay = "";

//               if (update.createdAt) {
//                 const dt = new Date(update.createdAt);
//                 timeDisplay = dt.toLocaleTimeString("en-IN", {
//                   hour: "numeric",
//                   minute: "2-digit",
//                   hour12: true,
//                 });
//                 dateDisplay = dt.toLocaleDateString("en-IN", {
//                   day: "numeric",
//                   month: "short",
//                 });
//               }

//               const markerColor =
//                 update.status === "Marked Safe" ? "green" : "red";
//               const mapUrl =
//                 update.location?.coordinates && GOOGLE_MAPS_API_KEY
//                   ? `https://maps.googleapis.com/maps/api/staticmap?center=${update.location.coordinates[1]},${update.location.coordinates[0]}&zoom=13&size=600x300&markers=color:${markerColor}%7C${update.location.coordinates[1]},${update.location.coordinates[0]}&${darkMapStyleQuery}&key=${GOOGLE_MAPS_API_KEY}`
//                   : null;

//               return (
//                 <motion.div
//                   key={update.id || idx}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.4, delay: idx * 0.1 }}
//                 >
//                   <Card className="bg-gradient-to-b from-[#29201e] to-[#1d1514] border border-[#3a2f2d] rounded-2xl shadow-lg">
//                     <CardContent className="p-5">
//                       <div className="flex justify-between items-start mb-5">
//                         <div className="flex items-center gap-3 mt-1">
//                           <img
//                             src={
//                               update.user?.profilePic ||
//                               `https://i.pravatar.cc/40?u=${idx}`
//                             }
//                             alt="profile"
//                             width={50}
//                             height={50}
//                             className="rounded-full border-2 border-[#3a2f2d]"
//                           />
//                           <div>
//                             <p className="font-semibold text-white text-sm lg:text-base">
//                               {update.user?.username || "Anonymous"}
//                             </p>
//                             <p className="text-xs text-gray-400">
//                               {update.verified
//                                 ? "✅ Verified Report"
//                                 : "⚠️ Unverified"}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex flex-col items-end mt-2">
//                           <span className="text-sm font-medium text-gray-200">
//                             {timeDisplay.toUpperCase()}
//                           </span>
//                           <span className="text-xs text-gray-500">
//                             {dateDisplay}
//                           </span>
//                         </div>
//                       </div>

//                       <p className="text-sm lg:text-base text-[#e0d6d0] mb-4">
//                         {update.caption}
//                       </p>

//                       {mapUrl && (
//                         <div className="w-full h-40 lg:h-52 rounded-xl overflow-hidden mb-4 border border-[#3a2f2d]">
//                           <img
//                             src={mapUrl}
//                             alt="Map Preview"
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                       )}

//                       {/* ✅ Only View Details */}
//                       <div className="flex">
//                         <button
//                           onClick={() =>
//                             navigate(`/community/${update.id || idx}`, {
//                               state: update,
//                             })
//                           }
//                           className="flex-1 py-2 rounded-xl bg-white text-black font-medium text-sm lg:text-base border border-[#3a2f2d] hover:bg-[#403633] transition"
//                         >
//                           View Details
//                         </button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Bottom Navigation */}
//       <BottomNavigation />

//       {/* Notification Panel */}
//       <NotificationPanel
//         isOpen={isNotificationPanelOpen}
//         onClose={() => setNotificationPanelOpen(false)}
//         notifications={notifications}
//         onMarkAsRead={markAsRead}
//         onMarkAsUnread={markAsUnread}
//         onDelete={deleteNotification}
//         onClearAll={clearAll}
//         onMarkAllAsRead={markAllAsRead}
//         unreadCount={unreadCount}
//       />
//     </div>
//   );
// }

// export default DashboardPage;




// // Version 3 with map changed and working before white theme 
// /// <reference types="@types/google.maps" />

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/Card";
// import { MapPin, Menu } from "lucide-react";
// import axios from "axios";
// import { Icon } from "@iconify/react";
// import { useAuth } from "@/hooks/use-auth";
// import { BottomNavigation } from "@/components/layout/BottomNavigation";
// import { useNavigate } from "react-router-dom";
// import { Sidebar } from "@/components/layout/Sidebar";
// import { ProfileSidebar } from "@/components/layout/ProfileSidebar";
// import {
//   NotificationButton,
//   NotificationPanel,
// } from "@/components/ui/NotificationPanel";
// import { useNotifications } from "@/hooks/use-notifications";
// import { useUserLocation } from "@/hooks/use-user-location";
// import { ROUTES } from "@/lib/constants";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

// // ✅ Google Maps API key
// const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// // ✅ Dark theme map style (same as LiveHazardMapPage)
// const darkMapStyle = [
//   { elementType: "geometry", stylers: [{ color: "#212121" }] },
//   { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
//   { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
//   { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
//   { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#2c2c2c" }] },
//   { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
//   { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
//   { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d3d3d" }] },
// ];

// // ✅ API Base URLs
// const COMMUNITY_BASE = "https://fast-api-f789.onrender.com";

// // ✅ Skeleton Loader
// const SkeletonBlock = ({ className = "" }: { className?: string }) => (
//   <div className={`bg-[#2a2a2a] animate-pulse rounded-xl ${className}`} />
// );

// export function DashboardPage() {
//   const userLocation = useUserLocation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [scrolled, setScrolled] = useState(false);
//   const { user } = useAuth();
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [isProfileSidebarOpen, setProfileSidebarOpen] = useState(false);
//   const [isNotificationPanelOpen, setNotificationPanelOpen] = useState(false);
//   const [communityUpdates, setCommunityUpdates] = useState<any[]>([]);
//   const [alerts, setAlerts] = useState<any[]>([]);

//   // ✅ Google Maps Loader
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: GOOGLE_MAPS_API_KEY as string,
//   });

//   // ✅ Notifications
//   const {
//     notifications,
//     unreadCount,
//     markAsRead,
//     markAsUnread,
//     deleteNotification,
//     clearAll,
//     markAllAsRead,
//   } = useNotifications();

//   // ✅ Fetch community updates
//   useEffect(() => {
//     async function fetchCommunityUpdates() {
//       try {
//         const res = await fetch(`${COMMUNITY_BASE}/rank-posts`);
//         const data = await res.json();
//         setCommunityUpdates(data.rankedPosts || []);
//       } catch (err) {
//         console.error("Error fetching community updates:", err);
//       }
//     }
//     fetchCommunityUpdates();
//   }, []);

//   // ✅ Fetch alerts
//   useEffect(() => {
//     async function fetchAlerts() {
//       try {
//         const res = await axios.get("http://localhost:5002/api/all-users-alert", {
//           withCredentials: true,
//         });
//         setAlerts(res.data.alerts || []);
//       } catch (err) {
//         console.error("Error fetching alerts:", err);
//       } finally {
//         setTimeout(() => setLoading(false), 1500);
//       }
//     }
//     fetchAlerts();
//   }, []);

//   // ✅ Scroll detection
//   useEffect(() => {
//     function onScroll() {
//       setScrolled(window.scrollY > 8);
//     }
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // ✅ Map severity to marker colors
//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "critical":
//         return "red";
//       case "high":
//         return "orange";
//       case "medium":
//         return "yellow";
//       case "low":
//         return "green";
//       default:
//         return "blue";
//     }
//   };

//   // ✅ Function to open in Google Maps
//   const openInMaps = (coords: [number, number]) => {
//     const [lng, lat] = coords;
//     const url = `https://www.google.com/maps/place/${lat},${lng}/@${lat},${lng},15z/data=!3m1!1e3`;
//     window.open(url, "_blank", "noopener,noreferrer");
//   };

//   return (
//     <div className="bg-[#1f1816] min-h-screen text-white pb-28 font-sans">
//       {/* Header */}
//       <motion.header
//         animate={{
//           boxShadow: scrolled
//             ? "0 8px 20px rgba(0,0,0,0.6)"
//             : "0 2px 6px rgba(0,0,0,0.25)",
//           backdropFilter: "saturate(120%) blur(6px)",
//         }}
//         transition={{ duration: 0.2 }}
//         className="sticky top-0 z-40 bg-[#2b2320]/55 border-b border-[#3a2f2d] px-5 py-4 flex justify-between items-center"
//       >
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#372a28]/80 hover:bg-[#443331] transition"
//           >
//             <Menu size={22} />
//           </button>
//           <div>
//             <h1 className="font-bold text-lg lg:text-xl">Rescue Saathi</h1>
//             <p className="text-sm text-[#d8cdc6] flex items-center">
//               <MapPin size={14} className="mr-1" /> {userLocation}
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3 relative">
//           <NotificationButton
//             unreadCount={unreadCount}
//             onClick={() => setNotificationPanelOpen(true)}
//           />
//           <button
//             onClick={() => setProfileSidebarOpen(true)}
//             className="flex items-center"
//           >
//             <img
//               src={user?.photoURL || "https://i.pravatar.cc/40"}
//               alt="profile"
//               width={44}
//               height={44}
//               className="rounded-full object-cover border-2 border-[#2f2523]"
//             />
//           </button>
//         </div>
//       </motion.header>

//       {/* Sidebars */}
//       <ProfileSidebar
//         isOpen={isProfileSidebarOpen}
//         onClose={() => setProfileSidebarOpen(false)}
//       />
//       <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

//       {/* Alerts Section */}
//       {alerts.length > 0 && (
//         <div className="px-5 lg:px-20 xl:px-40">
//           <h2 className="font-semibold text-lg lg:text-xl mt-6 mb-4">
//             Active Alerts
//           </h2>

//           <div className="mt-2">
//             {loading ? (
//               <div className="mb-6">
//                 <SkeletonBlock className="h-14 w-full mb-3" />
//                 <SkeletonBlock className="h-48 w-full" />
//               </div>
//             ) : (
//               alerts.map((alert, idx) => {
//                 const dt = new Date(alert.createdAt);
//                 const dateStr = dt.toLocaleDateString("en-IN", {
//                   day: "numeric",
//                   month: "short",
//                 });
//                 const timeStr = dt.toLocaleTimeString("en-IN", {
//                   hour: "numeric",
//                   minute: "2-digit",
//                   hour12: true,
//                 });
//                 const severityColor =
//                   alert.severity === "critical"
//                     ? "bg-red-500"
//                     : alert.severity === "high"
//                     ? "bg-orange-500"
//                     : alert.severity === "medium"
//                     ? "bg-yellow-500"
//                     : "bg-green-500";

//                 const markerColor = getSeverityColor(alert.severity);
//                 const mapUrl =
//                   alert.postLocation?.coordinates && GOOGLE_MAPS_API_KEY
//                     ? `https://maps.googleapis.com/maps/api/staticmap?center=${alert.postLocation.coordinates[1]},${alert.postLocation.coordinates[0]}&zoom=14&size=600x300&markers=color:${markerColor}%7C${alert.postLocation.coordinates[1]},${alert.postLocation.coordinates[0]}&key=${GOOGLE_MAPS_API_KEY}`
//                     : null;

//                 return (
//                   <motion.div
//                     key={alert._id || idx}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.4, delay: idx * 0.1 }}
//                   >
//                     <Card className="bg-gradient-to-br from-[#2a1e1c] to-[#1e1614] border border-[#3a2f2d] rounded-2xl mb-6 shadow-lg">
//                       <CardContent className="p-5">
//                         <div className="flex items-center justify-between mb-4 flex-wrap lg:flex-nowrap">
//                           <div className="flex items-center gap-3">
//                             <div
//                               className={`p-2 ${severityColor}/15 rounded-full flex items-center justify-center mt-2`}
//                             >
//                               <Icon
//                                 icon="mdi:alert"
//                                 className={`${severityColor.replace(
//                                   "bg-",
//                                   "text-"
//                                 )} text-xl`}
//                               />
//                             </div>
//                             <div className="mt-2">
//                               <h2 className="font-semibold text-white text-sm sm:text-base lg:text-lg">
//                                 {alert.message}
//                               </h2>
//                               <p className="text-xs text-[#bfb2ac]">
//                                 Issued: {dateStr}, {timeStr}
//                               </p>
//                               <p className="text-xs text-gray-400">
//                                 Reporter:{" "}
//                                 {alert.report?.user?.username || "Unknown"} |{" "}
//                                 Hazard: {alert.report?.hazardType}
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-1.5 mt-2">
//                             <span
//                               className={`w-2.5 h-2.5 ${severityColor} rounded-full animate-pulse`}
//                             />
//                             <span className="text-xs text-red-300 font-medium">
//                               Live
//                             </span>
//                           </div>
//                         </div>

//                         {mapUrl && (
//                           <div className="w-full h-52 lg:h-64 rounded-xl overflow-hidden border border-[#3a2f2d]">
//                             <img
//                               src={mapUrl}
//                               alt="Alert location map"
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                         )}
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 );
//               })
//             )}
//           </div>

//           {/* ✅ Quick Actions */}
//           {!loading && (
//             <div className="grid grid-cols-4 gap-3 my-6 text-center">
//               {[
//                 {
//                   icon: <Icon icon="mdi:phone" className="text-xl" />,
//                   label: "Emergency\nHotlines",
//                   route: ROUTES.EMERGENCY_HOTLINES,
//                 },
//                 // {
//                 //   icon: <Icon icon="mdi:information" className="text-xl" />,
//                 //   label: "View\nUpdates",
//                 //   route: ROUTES.VIEW_DETAILS,
//                 // },

//                {
//         icon: <Icon icon="mdi:account-group" className="text-xl" />,
//         label: "See\nCommunity",
//         route: ROUTES.COMMUNITY,
//       },
//                 {
//                   icon: <Icon icon="mdi:radio-handheld" className="text-xl" />,
//                   label: "See\nHotspots",
//                   route: ROUTES.LIVE_HAZARD_MAP,
//                 },
//                 {
//                   icon: <Icon icon="mdi:dots-horizontal" className="text-xl" />,
//                   label: "See\nMore",
//                   route: ROUTES.SEE_MORE,
//                 },
//               ].map((it, idx) => (
//                 <div
//                   key={idx}
//                   onClick={() => navigate(it.route)}
//                   className="flex flex-col items-center gap-1 cursor-pointer"
//                 >
//                   <div className="p-3 rounded-full bg-[#2a2a2a] w-14 h-14 flex items-center justify-center hover:scale-105 transition-transform">
//                     {it.icon}
//                   </div>
//                   <p className="text-xs leading-tight whitespace-pre-line text-[#d8cdc6]">
//                     {it.label}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Community Updates */}
//       <div className="px-5 lg:px-20 xl:px-40">
//         <div className="mb-4 mt-8">
//           <h2 className="font-semibold text-lg lg:text-xl mb-4">
//             Community Updates
//           </h2>
//         </div>

//         {!loading && (
//           <div className="grid gap-6 lg:grid-cols-2">
//             {communityUpdates.map((update, idx) => {
//               let timeDisplay = "";
//               let dateDisplay = "";

//               if (update.createdAt) {
//                 const dt = new Date(update.createdAt);
//                 timeDisplay = dt.toLocaleTimeString("en-IN", {
//                   hour: "numeric",
//                   minute: "2-digit",
//                   hour12: true,
//                 });
//                 dateDisplay = dt.toLocaleDateString("en-IN", {
//                   day: "numeric",
//                   month: "short",
//                 });
//               }

//               return (
//                 <motion.div
//                   key={update.id || idx}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.4, delay: idx * 0.1 }}
//                 >
//                   <Card className="bg-gradient-to-b from-[#29201e] to-[#1d1514] border border-[#3a2f2d] rounded-2xl shadow-lg">
//                     <CardContent className="p-5">
//                       <div className="flex justify-between items-start mb-5">
//                         <div className="flex items-center gap-3 mt-1">
//                           <img
//                             src={
//                               update.user?.profilePic ||
//                               `https://i.pravatar.cc/40?u=${idx}`
//                             }
//                             alt="profile"
//                             width={50}
//                             height={50}
//                             className="rounded-full border-2 border-[#3a2f2d]"
//                           />
//                           <div>
//                             <p className="font-semibold text-white text-sm lg:text-base">
//                               {update.user?.username || "Anonymous"}
//                             </p>
//                             <p className="text-xs text-gray-400">
//                               {update.verified
//                                 ? "✅ Verified Report"
//                                 : "⚠️ Unverified"}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex flex-col items-end mt-2">
//                           <span className="text-sm font-medium text-gray-200">
//                             {timeDisplay.toUpperCase()}
//                           </span>
//                           <span className="text-xs text-gray-500">
//                             {dateDisplay}
//                           </span>
//                         </div>
//                       </div>

//                       <p className="text-sm lg:text-base text-[#e0d6d0] mb-4">
//                         {update.caption}
//                       </p>

//                       {/* ✅ Interactive Google Map Preview */}
//                       {isLoaded &&
//                         update.location?.coordinates &&
//                         update.location.coordinates.length === 2 && (
//                           <div className="w-full h-40 lg:h-52 rounded-xl overflow-hidden mb-4 border border-[#3a2f2d]">
//                             <GoogleMap
//                               mapContainerStyle={{ width: "100%", height: "100%" }}
//                               center={{
//                                 lat: Number(update.location.coordinates[1]),
//                                 lng: Number(update.location.coordinates[0]),
//                               }}
//                               zoom={15}
//                               options={{
//                                 styles: darkMapStyle,
//                                 disableDefaultUI: true,
//                                 zoomControl: false,
//                                 draggable: false,
//                                 scrollwheel: false,
//                               }}
//                               onClick={() => openInMaps(update.location.coordinates)}
//                             >
//                               <Marker
//                                 position={{
//                                   lat: Number(update.location.coordinates[1]),
//                                   lng: Number(update.location.coordinates[0]),
//                                 }}
//                                 onClick={() => openInMaps(update.location.coordinates)}
//                               />
//                             </GoogleMap>
//                           </div>
//                         )}

//                       <div className="flex">
//                         <button
//                           onClick={() =>
//                             navigate(`/community/${update.id || idx}`, {
//                               state: update,
//                             })
//                           }
//                           className="flex-1 py-2 rounded-xl bg-white text-black font-medium text-sm lg:text-base border border-[#3a2f2d] hover:bg-[#403633] transition"
//                         >
//                           View Details
//                         </button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Bottom Navigation */}
//       <BottomNavigation />

//       {/* Notification Panel */}
//       <NotificationPanel
//         isOpen={isNotificationPanelOpen}
//         onClose={() => setNotificationPanelOpen(false)}
//         notifications={notifications}
//         onMarkAsRead={markAsRead}
//         onMarkAsUnread={markAsUnread}
//         onDelete={deleteNotification}
//         onClearAll={clearAll}
//         onMarkAllAsRead={markAllAsRead}
//         unreadCount={unreadCount}
//       />
//     </div>
//   );
// }

// export default DashboardPage;



/// <reference types="@types/google.maps" />

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { MapPin, Menu } from "lucide-react";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useAuth } from "@/hooks/use-auth";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProfileSidebar } from "@/components/layout/ProfileSidebar";
import {
  NotificationButton,
  NotificationPanel,
} from "@/components/ui/NotificationPanel";
import { useNotifications } from "@/hooks/use-notifications";
import { useUserLocation } from "@/hooks/use-user-location";
import { ROUTES } from "@/lib/constants";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

// ✅ Google Maps API key
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// ✅ Dark theme map style (same as LiveHazardMapPage)
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#212121" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
  { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#2c2c2c" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d3d3d" }] },
];

// ✅ API Base URLs
const COMMUNITY_BASE = "https://fast-api-f789.onrender.com";

// ✅ Skeleton Loader
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-200 dark:bg-[#2a2a2a] animate-pulse rounded-xl ${className}`} />
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

  // ✅ Google Maps Loader
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY as string,
  });

  // ✅ Notifications
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAsUnread,
    deleteNotification,
    clearAll,
    markAllAsRead,
  } = useNotifications();

  // ✅ Fetch community updates
  useEffect(() => {
    async function fetchCommunityUpdates() {
      try {
        const res = await fetch(`${COMMUNITY_BASE}/rank-posts`);
        const data = await res.json();
        setCommunityUpdates(data.rankedPosts || []);
      } catch (err) {
        console.error("Error fetching community updates:", err);
      }
    }
    fetchCommunityUpdates();
  }, []);

  // ✅ Fetch alerts
  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await axios.get("http://localhost:5002/api/all-users-alert", {
          withCredentials: true,
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

  // ✅ Scroll detection
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Map severity to marker colors
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "red";
      case "high":
        return "orange";
      case "medium":
        return "yellow";
      case "low":
        return "green";
      default:
        return "blue";
    }
  };

  // ✅ Function to open in Google Maps
  const openInMaps = (coords: [number, number]) => {
    const [lng, lat] = coords;
    const url = `https://www.google.com/maps/place/${lat},${lng}/@${lat},${lng},15z/data=!3m1!1e3`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-gray-50 dark:bg-[#1f1816] min-h-screen text-gray-900 dark:text-white pb-28 font-sans">
      {/* Header */}
      <motion.header
        animate={{
          boxShadow: scrolled
            ? "0 8px 20px rgba(0,0,0,0.1)"
            : "0 2px 6px rgba(0,0,0,0.05)",
          backdropFilter: "saturate(120%) blur(6px)",
        }}
        transition={{ duration: 0.2 }}
        className="sticky top-0 z-40 bg-white/70 dark:bg-[#2b2320]/55 border-b border-gray-200 dark:border-[#3a2f2d] px-5 py-4 flex justify-between items-center"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-[#372a28]/80 hover:bg-gray-200 dark:hover:bg-[#443331] transition"
          >
            <Menu size={22} />
          </button>
          <div>
            <h1 className="font-bold text-lg lg:text-xl">Rescue Saathi</h1>
            <p className="text-sm text-gray-600 dark:text-[#d8cdc6] flex items-center">
              <MapPin size={14} className="mr-1" /> {userLocation}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative">
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
              className="rounded-full object-cover border-2 border-gray-200 dark:border-[#2f2523]"
            />
          </button>
        </div>
      </motion.header>

      {/* Sidebars */}
      <ProfileSidebar
        isOpen={isProfileSidebarOpen}
        onClose={() => setProfileSidebarOpen(false)}
      />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="px-5 lg:px-20 xl:px-40">
          <h2 className="font-semibold text-lg lg:text-xl mt-6 mb-4">
            Active Alerts
          </h2>

          <div className="mt-2">
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
                    : alert.severity === "high"
                    ? "bg-orange-500"
                    : alert.severity === "medium"
                    ? "bg-yellow-500"
                    : "bg-green-500";

                const markerColor = getSeverityColor(alert.severity);
                const mapUrl =
                  alert.postLocation?.coordinates && GOOGLE_MAPS_API_KEY
                    ? `https://maps.googleapis.com/maps/api/staticmap?center=${alert.postLocation.coordinates[1]},${alert.postLocation.coordinates[0]}&zoom=14&size=600x300&markers=color:${markerColor}%7C${alert.postLocation.coordinates[1]},${alert.postLocation.coordinates[0]}&key=${GOOGLE_MAPS_API_KEY}`
                    : null;

                return (
                  <motion.div
                    key={alert._id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <Card className="bg-white dark:bg-gradient-to-br dark:from-[#2a1e1c] dark:to-[#1e1614] border border-gray-200 dark:border-[#3a2f2d] rounded-2xl mb-6 shadow">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-4 flex-wrap lg:flex-nowrap">
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
                              <h2 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base lg:text-lg">
                                {alert.message}
                              </h2>
                              <p className="text-xs text-gray-600 dark:text-[#bfb2ac]">
                                Issued: {dateStr}, {timeStr}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Reporter:{" "}
                                {alert.report?.user?.username || "Unknown"} |{" "}
                                Hazard: {alert.report?.hazardType}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 mt-2">
                            <span
                              className={`w-2.5 h-2.5 ${severityColor} rounded-full animate-pulse`}
                            />
                            <span className="text-xs text-red-500 dark:text-red-300 font-medium">
                              Live
                            </span>
                          </div>
                        </div>

                        {mapUrl && (
                          <div className="w-full h-52 lg:h-64 rounded-xl overflow-hidden border border-gray-200 dark:border-[#3a2f2d]">
                            <img
                              src={mapUrl}
                              alt="Alert location map"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* ✅ Quick Actions */}
          {!loading && (
            <div className="grid grid-cols-4 gap-3 my-6 text-center">
              {[
                {
                  icon: <Icon icon="mdi:phone" className="text-xl" />,
                  label: "Emergency\nHotlines",
                  route: ROUTES.EMERGENCY_HOTLINES,
                },
                {
                  icon: <Icon icon="mdi:account-group" className="text-xl" />,
                  label: "See\nCommunity",
                  route: ROUTES.COMMUNITY,
                },
                {
                  icon: <Icon icon="mdi:radio-handheld" className="text-xl" />,
                  label: "See\nHotspots",
                  route: ROUTES.LIVE_HAZARD_MAP,
                },
                {
                  icon: <Icon icon="mdi:dots-horizontal" className="text-xl" />,
                  label: "See\nMore",
                  route: ROUTES.SEE_MORE,
                },
              ].map((it, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(it.route)}
                  className="flex flex-col items-center gap-1 cursor-pointer"
                >
                  <div className="p-3 rounded-full bg-gray-100 dark:bg-[#2a2a2a] w-14 h-14 flex items-center justify-center hover:scale-105 transition-transform">
                    {it.icon}
                  </div>
                  <p className="text-xs leading-tight whitespace-pre-line text-gray-600 dark:text-[#d8cdc6]">
                    {it.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Community Updates */}
      <div className="px-5 lg:px-20 xl:px-40">
        <div className="mb-4 mt-8">
          <h2 className="font-semibold text-lg lg:text-xl mb-4">
            Community Updates
          </h2>
        </div>

        {!loading && (
          <div className="grid gap-6 lg:grid-cols-2">
            {communityUpdates.map((update, idx) => {
              let timeDisplay = "";
              let dateDisplay = "";

              if (update.createdAt) {
                const dt = new Date(update.createdAt);
                timeDisplay = dt.toLocaleTimeString("en-IN", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                });
                dateDisplay = dt.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                });
              }

              return (
                <motion.div
                  key={update.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <Card className="bg-white dark:bg-gradient-to-b dark:from-[#29201e] dark:to-[#1d1514] border border-gray-200 dark:border-[#3a2f2d] rounded-2xl shadow">
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
                            className="rounded-full border-2 border-gray-200 dark:border-[#3a2f2d]"
                          />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">
                              {update.user?.username || "Anonymous"}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {update.verified
                                ? "✅ Verified Report"
                                : "⚠️ Unverified"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end mt-2">
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {timeDisplay.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {dateDisplay}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm lg:text-base text-gray-800 dark:text-[#e0d6d0] mb-4">
                        {update.caption}
                      </p>

                      {/* ✅ Interactive Google Map Preview */}
                      {isLoaded &&
                        update.location?.coordinates &&
                        update.location.coordinates.length === 2 && (
                          <div className="w-full h-40 lg:h-52 rounded-xl overflow-hidden mb-4 border border-gray-200 dark:border-[#3a2f2d]">
                            <GoogleMap
                              mapContainerStyle={{ width: "100%", height: "100%" }}
                              center={{
                                lat: Number(update.location.coordinates[1]),
                                lng: Number(update.location.coordinates[0]),
                              }}
                              zoom={15}
                              options={{
                                styles: darkMapStyle,
                                disableDefaultUI: true,
                                zoomControl: false,
                                draggable: false,
                                scrollwheel: false,
                              }}
                              onClick={() => openInMaps(update.location.coordinates)}
                            >
                              <Marker
                                position={{
                                  lat: Number(update.location.coordinates[1]),
                                  lng: Number(update.location.coordinates[0]),
                                }}
                                onClick={() => openInMaps(update.location.coordinates)}
                              />
                            </GoogleMap>
                          </div>
                        )}

                      <div className="flex">
                        <button
                          onClick={() =>
                            navigate(`/community/${update.id || idx}`, {
                              state: update,
                            })
                          }
                          className="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-white text-gray-900 dark:text-black font-medium text-sm lg:text-base border border-gray-200 dark:border-[#3a2f2d] hover:bg-gray-200 dark:hover:bg-[#403633] transition"
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

      {/* Bottom Navigation */}
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
