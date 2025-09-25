// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/Card";
// import {
//   MapPin,
//   Bell,
//   ChevronDown,
//   Menu,
//   Phone,
//   Info,
//   Radio,
//   MoreHorizontal,
// } from "lucide-react";

// import { Icon } from "@iconify/react";
// import { useAuth } from "@/hooks/use-auth";
// import { BottomNavigation } from "@/components/layout/BottomNavigation";
// import { useNavigate } from "react-router-dom";
// import { Sidebar } from "@/components/layout/Sidebar";
// import { ProfileSidebar } from "@/components/layout/ProfileSidebar";

// // Skeleton Block
// const SkeletonBlock = ({ className = "" }: { className?: string }) => (
//   <div className={`bg-[#2a2a2a] animate-pulse rounded-xl ${className}`} />
// );

// // Define your routes - update these paths to match your app's routing
// const ROUTES = {
//   EMERGENCY_HOTLINES: "/hotlines",
//   VIEW_DETAILS: "/details",
//   REPORT_UPDATES: "/report",
//   SEE_MORE: "/more",
// };

// export function DashboardPage() {
//   const navigate = useNavigate();
//   const [filter, setFilter] = useState("All");
//   const [loading, setLoading] = useState(true);
//   const [scrolled, setScrolled] = useState(false);
//   const { user } = useAuth();
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [isProfileSidebarOpen, setProfileSidebarOpen] = useState(false);
//   const [communityUpdates, setCommunityUpdates] = useState<any[]>([]);

//   useEffect(() => {
//     async function fetchCommunityUpdates() {
//       try {
//         const res = await fetch("http://127.0.0.1:5002/rank-posts");
//         const data = await res.json();
//         setCommunityUpdates(data.rankedPosts || []);
//       } catch (err) {
//         console.error("Error fetching community updates:", err);
//       } finally {
//         // Simulate loading for demonstration
//         setTimeout(() => setLoading(false), 1500);
//       }
//     }
//     fetchCommunityUpdates();
//   }, []);

//   useEffect(() => {
//     function onScroll() {
//       setScrolled(window.scrollY > 8);
//     }
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

//   const darkMapStyleQuery = [
//     'style=feature:all|element:geometry|color:0x212121',
//     'style=feature:all|element:labels.text.fill|color:0x757575',
//     'style=feature:all|element:labels.text.stroke|color:0x212121',
//     'style=feature:administrative|element:geometry|color:0x757575',
//     'style=feature:administrative.country|element:labels.text.fill|color:0x9e9e9e',
//     'style=feature:road|element:geometry.fill|color:0x2c2c2c',
//     'style=feature:road|element:labels.text.fill|color:0x8a8a8a',
//     'style=feature:road.arterial|element:geometry|color:0x373737',
//     'style=feature:road.highway|element:geometry|color:0x3c3c3c',
//     'style=feature:water|element:geometry|color:0x000000',
//     'style=feature:poi.park|element:geometry|color:0x181818',
//     'style=element:labels.icon|visibility:off'
//   ].join('&');

//   return (
//     <div className="bg-[#1f1816] min-h-screen text-white pb-28 font-sans">
//       {/* Sticky Header */}
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
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="flex items-center gap-3"
//         >
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#372a28]/80 hover:bg-[#443331] transition"
//           >
//             <Menu size={22} />
//           </button>
//           <div>
//             <h1 className="font-bold text-lg">Rescue Saathi</h1>
//             <p className="text-sm text-[#d8cdc6] flex items-center">
//               <MapPin size={14} className="mr-1" /> Kolkata, West Bengal
//             </p>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4, delay: 0.1 }}
//           className="flex items-center gap-3 relative"
//         >
//           <button className="relative w-10 h-10 rounded-full bg-[#372a28] flex items-center justify-center hover:scale-105 transition-transform">
//             <Bell size={18} />
//             <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-1 ring-[#372a28]" />
//           </button>
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
//         </motion.div>
//       </motion.header>
//       <ProfileSidebar
//         isOpen={isProfileSidebarOpen}
//         onClose={() => setProfileSidebarOpen(false)}
//       />
//       <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <div className="px-5">
//         {/* High Wave Alert Box */}
//         <div className="mt-5">
//           {loading ? (
//             <div className="mb-6">
//               <SkeletonBlock className="h-14 w-full mb-3" />
//               <SkeletonBlock className="h-48 w-full" />
//             </div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//             >
//               <Card className="bg-gradient-to-br from-[#2a1e1c] to-[#1e1614] border border-[#3a2f2d] rounded-2xl mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
//                 <CardContent className="p-5">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-red-500/15 rounded-full flex items-center justify-center mt-2">
//                         <Icon
//                           icon="mdi:alert"
//                           className="text-red-400 text-xl"
//                         />
//                       </div>
//                       <div className="mt-2">
//                         <h2 className="font-semibold text-white text-sm sm:text-base leading-snug">
//                           High Wave Alert – Odisha Coast
//                         </h2>
//                         <p className="text-xs text-[#bfb2ac] mt-0.5">
//                           Issued: 17 Sept 2025, 01:30 UTC
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-1.5 mt-2">
//                       <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
//                       <span className="text-xs text-red-300 font-medium">
//                         Live
//                       </span>
//                     </div>
//                   </div>
//                   <div className="w-full h-44 bg-[#131212] rounded-xl overflow-hidden border border-[#3a2f2d] shadow-inner">
//                     <img
//                       src="https://i.imgur.com/AYp2z2A.png"
//                       alt="Alert location map"
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}
//         </div>

//         {/* Quick Actions -- THIS IS THE ADDED PART */}
//         {loading ? (
//           <div className="grid grid-cols-4 gap-3 mb-6">
//             {Array(4)
//               .fill(0)
//               .map((_, i) => (
//                 <div key={i} className="flex flex-col items-center gap-2">
//                   <SkeletonBlock className="h-14 w-14 mx-auto rounded-full" />
//                   <SkeletonBlock className="h-3 w-12" />
//                 </div>
//               ))}
//           </div>
//         ) : (
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={{
//               hidden: { opacity: 0 },
//               visible: {
//                 opacity: 1,
//                 transition: { staggerChildren: 0.1, delayChildren: 0.2 },
//               },
//             }}
//             className="grid grid-cols-4 gap-3 mb-6 text-center"
//           >
//             {[
//               {
//                 icon: <Phone size={22} />,
//                 label: "Emergency\nHotlines",
//                 path: ROUTES.EMERGENCY_HOTLINES,
//               },
//               {
//                 icon: <Info size={22} />,
//                 label: "View\nDetails",
//                 path: ROUTES.VIEW_DETAILS,
//               },
//               {
//                 icon: <Radio size={22} />,
//                 label: "Report\nUpdates",
//                 path: ROUTES.REPORT_UPDATES,
//               },
//               {
//                 icon: <MoreHorizontal size={22} />,
//                 label: "See\nMore",
//                 path: ROUTES.SEE_MORE,
//               },
//             ].map((it, idx) => (
//               <motion.div
//                 key={idx}
//                 variants={{
//                   hidden: { opacity: 0, y: 20 },
//                   visible: { opacity: 1, y: 0 },
//                 }}
//                 className="flex flex-col items-center gap-1"
//               >
//                 <button
//                   onClick={() => navigate(it.path)}
//                   className="p-3 rounded-full bg-[#2a2a2a] w-14 h-14 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform border border-[#3a2f2d]"
//                 >
//                   {it.icon}
//                 </button>
//                 <p className="text-xs leading-tight whitespace-pre-line text-[#d8cdc6]">
//                   {it.label}
//                 </p>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}

//         {/* Community Updates */}
//         <div className="mb-4 mt-8">
//           <h2 className="font-semibold text-lg mb-4">Community Updates</h2>
//           {/* ... filter buttons ... */}
//         </div>

//         {!loading && (
//           <div>
//             {communityUpdates.map((update, idx) => {
//               let timeDisplay = "";
//               let dateDisplay = "";
//               if (update.postedAtIST) {
//                 const dt = new Date(update.postedAtIST);
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

//               const markerColor = update.status === 'Marked Safe' ? 'green' : 'red';

//               const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${update.location.coordinates[1]},${update.location.coordinates[0]}&zoom=13&size=600x300&markers=color:${markerColor}%7C${update.location.coordinates[1]},${update.location.coordinates[0]}&${darkMapStyleQuery}&key=${GOOGLE_MAPS_API_KEY}`;

//               return (
//                 <motion.div
//                   key={update.id || idx}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.4, delay: idx * 0.1 }}
//                 >
//                   <Card className="bg-gradient-to-b from-[#29201e] to-[#1d1514] border border-[#3a2f2d] rounded-2xl mb-6 shadow-[0_6px_20px_rgba(0,0,0,0.45)]">
//                     <CardContent className="p-5">
//                       <div className="flex justify-between items-start mb-5">
//                         <div className="flex items-center gap-3 mt-1">
//                           <img src={update.user?.profilePic || `https://i.pravatar.cc/40?u=${idx}`} alt="profile" width={50} height={50} className="rounded-full border-2 border-[#3a2f2d] shadow-sm mt-1"/>
//                           <div className="mt-1">
//                             <p className="font-semibold text-white text-sm leading-tight">{update.user?.username || "Anonymous"}</p>
//                             <p className="text-xs text-gray-400 mt-0.5">{update.verified ? "✅ Verified Report" : "⚠️ Unverified"}</p>
//                           </div>
//                         </div>
//                         <div className="flex flex-col items-end mt-2">
//                           <span className="text-sm font-medium text-gray-200">{timeDisplay}</span>
//                           <span className="text-xs text-gray-500">{dateDisplay}</span>
//                         </div>
//                       </div>
                      
//                       <p className="text-sm text-[#e0d6d0] mb-4 leading-snug">{update.caption}</p>

//                       {update.photos && update.photos.length > 0 && (
//                         <div className="w-full h-44 bg-[#131212] rounded-xl overflow-hidden mb-4 border border-[#3a2f2d]">
//                           <img src={update.photos[0]} alt="Report media" className="w-full h-full object-cover"/>
//                         </div>
//                       )}

//                       {update.location?.coordinates && GOOGLE_MAPS_API_KEY && (
//                         <div className="w-full h-40 bg-[#131212] rounded-xl overflow-hidden mb-4 border border-[#3a2f2d]">
//                           <img
//                             src={mapUrl}
//                             alt="Map Preview of the report location"
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                       )}

//                       <div className="flex gap-3">
//                          <button className="flex-1 py-2 rounded-xl bg-[#2e2a28] text-white font-medium text-sm border border-[#3a2f2d] hover:bg-[#403633] transition">Confirm Safe</button>
//                          <button className="flex-1 py-2 rounded-xl bg-[#2e2a28] text-white font-medium text-sm border border-[#3a2f2d] hover:bg-[#403633] transition">Report Issue</button>
//                          <button onClick={() => navigate(`/community/${update.id || idx}`, { state: update })} className="flex-1 py-2 rounded-xl bg-[#2e2a28] text-white font-medium text-sm border border-[#3a2f2d] hover:bg-[#403633] transition">View Details</button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       <BottomNavigation />
//     </div>
//   );
// }

// export default DashboardPage;
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

import { Icon } from "@iconify/react";
import { useAuth } from "@/hooks/use-auth";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProfileSidebar } from "@/components/layout/ProfileSidebar";
import { ROUTES } from "@/lib/constants";
import { NotificationButton, NotificationPanel } from "@/components/ui/NotificationPanel";
import { useNotifications } from "@/hooks/use-notifications";

// Skeleton Block
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`bg-[#2a2a2a] animate-pulse rounded-xl ${className}`} />
);


export function DashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileSidebarOpen, setProfileSidebarOpen] = useState(false);
  const [isNotificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [communityUpdates, setCommunityUpdates] = useState<any[]>([]);
  
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
        const res = await fetch("https://sih-2025-roan.vercel.app/api/rank-posts");
        const data = await res.json();
        setCommunityUpdates(data.rankedPosts || []);
      } catch (err) {
        console.error("Error fetching community updates:", err);
      } finally {
        // Simulate loading for demonstration
        setTimeout(() => setLoading(false), 1500);
      }
    }
    fetchCommunityUpdates();
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const darkMapStyleQuery = [
    'style=feature:all|element:geometry|color:0x212121',
    'style=feature:all|element:labels.text.fill|color:0x757575',
    'style=feature:all|element:labels.text.stroke|color:0x212121',
    'style=feature:administrative|element:geometry|color:0x757575',
    'style=feature:administrative.country|element:labels.text.fill|color:0x9e9e9e',
    'style=feature:road|element:geometry.fill|color:0x2c2c2c',
    'style=feature:road|element:labels.text.fill|color:0x8a8a8a',
    'style=feature:road.arterial|element:geometry|color:0x373737',
    'style=feature:road.highway|element:geometry|color:0x3c3c3c',
    'style=feature:water|element:geometry|color:0x000000',
    'style=feature:poi.park|element:geometry|color:0x181818',
    'style=element:labels.icon|visibility:off'
  ].join('&');

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
              <MapPin size={14} className="mr-1" /> Kolkata, West Bengal
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
        {/* High Wave Alert Box */}
        <div className="mt-5">
          {loading ? (
            <div className="mb-6">
              <SkeletonBlock className="h-14 w-full mb-3" />
              <SkeletonBlock className="h-48 w-full" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-[#2a1e1c] to-[#1e1614] border border-[#3a2f2d] rounded-2xl mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-500/15 rounded-full flex items-center justify-center mt-2">
                        <Icon
                          icon="mdi:alert"
                          className="text-red-400 text-xl"
                        />
                      </div>
                      <div className="mt-2">
                        <h2 className="font-semibold text-white text-sm sm:text-base leading-snug">
                          High Wave Alert – Odisha Coast
                        </h2>
                        <p className="text-xs text-[#bfb2ac] mt-0.5">
                          Issued: 25 Sept 2025, 01:30 UTC
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
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
          )}
        </div>

        {/* Quick Actions */}
        {loading ? (
          <div className="grid grid-cols-4 gap-3 mb-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <SkeletonBlock className="h-14 w-14 mx-auto rounded-full" />
                  <SkeletonBlock className="h-3 w-12" />
                </div>
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
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}
            className="grid grid-cols-4 gap-3 mb-6 text-center"
          >
            {[
              {
                icon: <Phone size={22} />,
                label: "Emergency\nHotlines",
                path: ROUTES.EMERGENCY_HOTLINES,
              },
              {
                icon: <Info size={22} />,
                label: "View\nDetails",
                path: ROUTES.VIEW_DETAILS,
              },
              {
                icon: <Radio size={22} />,
                label: "Report\nUpdates",
                path: ROUTES.REPORT_UPDATES,
              },
              {
                icon: <MoreHorizontal size={22} />,
                label: "See\nMore",
                path: ROUTES.SEE_MORE,
              },
            ].map((it, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex flex-col items-center gap-1"
              >
                <button
                  onClick={() => navigate(it.path)}
                  className="p-3 rounded-full bg-[#2a2a2a] w-14 h-14 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform border border-[#3a2f2d]"
                >
                  {it.icon}
                </button>
                <p className="text-xs leading-tight whitespace-pre-line text-[#d8cdc6]">
                  {it.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Community Updates */}
        <div className="mb-4 mt-8">
          <h2 className="font-semibold text-lg mb-4">Community Updates</h2>
          {/* ... filter buttons ... */}
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

              const markerColor = update.status === 'Marked Safe' ? 'green' : 'red';
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
                          <img src={update.user?.profilePic || `https://i.pravatar.cc/40?u=${idx}`} alt="profile" width={50} height={50} className="rounded-full border-2 border-[#3a2f2d] shadow-sm mt-1"/>
                          <div className="mt-1">
                            <p className="font-semibold text-white text-sm leading-tight">{update.user?.username || "Anonymous"}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{update.verified ? "✅ Verified Report" : "⚠️ Unverified"}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end mt-2">
                          <span className="text-sm font-medium text-gray-200">{timeDisplay.toUpperCase()}</span>
                          <span className="text-xs text-gray-500">{dateDisplay}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-[#e0d6d0] mb-4 leading-snug">{update.caption}</p>

                      {update.photos && update.photos.length > 0 && (
                        <div className="w-full h-44 bg-[#131212] rounded-xl overflow-hidden mb-4 border border-[#3a2f2d]">
                          <img src={update.photos[0]} alt="Report media" className="w-full h-full object-cover"/>
                        </div>
                      )}

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
                         <button className="flex-1 py-2 rounded-xl bg-[#2e2a28] text-white font-medium text-sm border border-[#3a2f2d] hover:bg-[#403633] transition">Confirm Safe</button>
                         <button className="flex-1 py-2 rounded-xl bg-[#2e2a28] text-white font-medium text-sm border border-[#3a2f2d] hover:bg-[#403633] transition">Report Issue</button>
                         <button onClick={() => navigate(`/community/${update.id || idx}`, { state: update })} className="flex-1 py-2 rounded-xl bg-[#2e2a28] text-white font-medium text-sm border border-[#3a2f2d] hover:bg-[#403633] transition">View Details</button>
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
        unreadCount={unreadCount}
      />
    </div>
  );
}

export default DashboardPage;