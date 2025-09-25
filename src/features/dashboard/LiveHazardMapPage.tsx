// /// <reference types="@types/google.maps" />

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/Card";
// import { RefreshCw, MapPin, Menu } from "lucide-react";
// import { BottomNavigation } from "@/components/layout/BottomNavigation";
// import { useAuth } from "@/hooks/use-auth";
// import { Sidebar } from "@/components/layout/Sidebar";
// import { useUserLocation } from "@/hooks/use-user-location";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
// import { useNavigate } from "react-router-dom";

// const SkeletonBlock = ({ className = "" }: { className?: string }) => (
//   <div className={`bg-[#2a2a2a] animate-pulse rounded-xl ${className}`} />
// );

// // ✅ Google Maps Dark Mode Style
// const darkMapStyle = [
//   { elementType: "geometry", stylers: [{ color: "#212121" }] },
//   { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
//   { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
//   { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
//   {
//     featureType: "road",
//     elementType: "geometry.fill",
//     stylers: [{ color: "#2c2c2c" }],
//   },
//   {
//     featureType: "road",
//     elementType: "labels.text.fill",
//     stylers: [{ color: "#8a8a8a" }],
//   },
//   {
//     featureType: "water",
//     elementType: "geometry",
//     stylers: [{ color: "#000000" }],
//   },
//   {
//     featureType: "water",
//     elementType: "labels.text.fill",
//     stylers: [{ color: "#3d3d3d" }],
//   },
// ];

// export function LiveHazardMapPage() {
//   const userLocation = useUserLocation();
//   const [scrolled, setScrolled] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [hotspots, setHotspots] = useState<any[]>([]);
//   const navigate = useNavigate();

//   // ✅ Load Google Maps
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
//   });

//   useEffect(() => {
//     async function fetchHotspots() {
//       try {
//         setLoading(true);
//         const res = await fetch("https://sih-2025-l3ur.onrender.com/api/all-hotspot");
//         const data = await res.json();
//         if (data.success) {
//           const formatted = data.data.map((h: any) => {
//             const hazardTypes = [
//               ...new Set(h.reports.map((r: any) => r.hazardType)),
//             ];
//             let title = "";
//             if (hazardTypes.length > 1) {
//               title = "Most Reported Hotspot";
//             } else {
//               title = hazardTypes[0] || "Hazard Alert";
//             }

//             return {
//               id: h._id,
//               title,
//               createdAt: h.createdAt,
//               updatedAt: h.updatedAt,
//               location: h.center?.coordinates, // [lng, lat]
//               isLive: h.reports.length > 0,
//               reports: h.reports.length,
//             };
//           });
//           setHotspots(formatted);
//         }
//       } catch (err) {
//         console.error("Error fetching hotspots:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchHotspots();
//   }, []);

//   useEffect(() => {
//     function onScroll() {
//       setScrolled(window.scrollY > 8);
//     }
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <div className="bg-[#1f1816] min-h-screen text-white font-sans pb-28">
//       {/* Sticky Header */}
//       <motion.header
//         animate={{
//           boxShadow: scrolled
//             ? "0 8px 20px rgba(0,0,0,0.6)"
//             : "0 2px 6px rgba(0,0,0,0.25)",
//           backdropFilter: "saturate(120%) blur(6px)",
//         }}
//         transition={{ duration: 0.25 }}
//         className="sticky top-0 z-40 bg-[#2b2320]/55 border-b border-[#3a2f2d] px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center"
//       >
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-[#372a28]/80 hover:bg-[#443331] transition"
//           >
//             <Menu size={22} />
//           </button>

//           <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

//           <div>
//             <h1 className="font-bold text-base sm:text-lg">Live Hazard Map</h1>
//             <p className="text-xs sm:text-sm text-[#d8cdc6] flex items-center">
//               <MapPin size={14} className="mr-1" /> {userLocation}
//             </p>
//           </div>
//         </div>
//         <motion.button
//           whileTap={{ scale: 0.9 }}
//           whileHover={{ scale: 1.05 }}
//           onClick={() => window.location.reload()}
//           className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#372a28] flex items-center justify-center transition-transform"
//         >
//           <RefreshCw size={18} />
//         </motion.button>
//       </motion.header>

//       <div className="px-4 sm:px-6 mt-5 max-w-5xl mx-auto w-full">
//         {/* Hotspots List */}
//         <div className="space-y-6">
//           {loading
//             ? Array(2)
//                 .fill(0)
//                 .map((_, idx) => (
//                   <div key={idx} className="mb-4">
//                     <SkeletonBlock className="h-6 w-1/2 mb-3" />
//                     <SkeletonBlock className="h-40 sm:h-52 w-full" />
//                   </div>
//                 ))
//             : hotspots.map((h, i) => (
//                 <motion.div
//                   key={h.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.4, delay: i * 0.1 }}
//                 >
//                   <Card className="bg-gradient-to-b from-[#2a1e1c] to-[#1e1614] border border-[#3a2f2d] rounded-2xl overflow-hidden shadow-lg">
//                     <CardContent className="p-4 sm:p-5">
//                       <h2 className="font-semibold text-white capitalize mt-1 mb-2 text-sm sm:text-base md:text-lg">
//                         {h.title}
//                       </h2>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-3 text-xs sm:text-sm text-[#bfb2ac]">
//                         <p>Reports: {h.reports}</p>
//                         <p>Detected: {new Date(h.createdAt).toLocaleString()}</p>
//                         <p>Updated: {new Date(h.updatedAt).toLocaleString()}</p>
//                       </div>

//                       <div className="flex items-center gap-1.5 mt-2 mb-3">
//                         <span
//                           className={`w-2 h-2 rounded-full ${
//                             h.isLive ? "bg-red-500 animate-pulse" : "bg-gray-500"
//                           }`}
//                         ></span>
//                         <span
//                           className={`text-xs font-medium ${
//                             h.isLive ? "text-red-300" : "text-gray-400"
//                           }`}
//                         >
//                           {h.isLive ? "Live" : "Not Live"}
//                         </span>
//                       </div>

//                       {/* ✅ Responsive Map */}
//                       {isLoaded &&
//                         h.location &&
//                         h.location.length === 2 && (
//                           <div className="w-full h-40 sm:h-52 md:h-64 lg:h-72 rounded-xl overflow-hidden mb-4 border border-[#3a2f2d]">
//                             <GoogleMap
//                               mapContainerStyle={{
//                                 width: "100%",
//                                 height: "100%",
//                               }}
//                               center={{
//                                 lat: Number(h.location[1]) || 12.9716,
//                                 lng: Number(h.location[0]) || 77.5946,
//                               }}
//                               zoom={15}
//                               options={{
//                                 styles: darkMapStyle,
//                                 disableDefaultUI: true,
//                                 zoomControl: false,
//                                 draggable: false,
//                                 scrollwheel: false,
//                               }}
//                             >
//                               <Marker
//                                 position={{
//                                   lat: Number(h.location[1]),
//                                   lng: Number(h.location[0]),
//                                 }}
//                               />
//                             </GoogleMap>
//                           </div>
//                         )}

//                       {/* ✅ Responsive Action Buttons */}
//                       <div className="flex flex-col sm:flex-row gap-3 mt-3">
//                         <motion.button
//                           whileTap={{ scale: 0.97 }}
//                           className="flex-1 flex items-center justify-center bg-white text-black font-semibold py-2.5 rounded-full hover:scale-[1.02] transition-transform"
//                           onClick={() =>
//                             navigate(`/dashboard/hazard/${h.id}/details`)
//                           }
//                         >
//                           View Details
//                         </motion.button>
//                         <motion.button
//                           whileTap={{ scale: 0.97 }}
//                           className="flex-1 flex items-center justify-center bg-[#2b2320] border border-[#3a2f2d] text-white font-semibold py-2.5 rounded-full hover:bg-[#3b3230] transition-colors"
//                           onClick={() =>
//                             navigate(`/dashboard/hazard/${h.id}/map`)
//                           }
//                         >
//                           View on Map
//                         </motion.button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//         </div>
//       </div>

//       {/* ✅ Bottom Navigation */}
//       <BottomNavigation />
//     </div>
//   );
// }


/// <reference types="@types/google.maps" />

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { RefreshCw, MapPin, Menu } from "lucide-react";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/layout/Sidebar";
import { useUserLocation } from "@/hooks/use-user-location";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`bg-[#2a2a2a] animate-pulse rounded-xl ${className}`} />
);

// ✅ Google Maps Dark Mode Style
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

export function LiveHazardMapPage() {
  const userLocation = useUserLocation();
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [hotspots, setHotspots] = useState<any[]>([]);
  const navigate = useNavigate();

  // ✅ Load Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  useEffect(() => {
    async function fetchHotspots() {
      try {
        setLoading(true);
        const res = await fetch("https://sih-2025-l3ur.onrender.com/api/all-hotspot");
        const data = await res.json();
        if (data.success) {
          const formatted = data.data.map((h: any) => {
            const hazardTypes = [...new Set(h.reports.map((r: any) => r.hazardType))];
            let title = hazardTypes.length > 1 ? "Most Reported Hotspot" : hazardTypes[0] || "Hazard Alert";

            return {
              id: h._id,
              title,
              createdAt: h.createdAt,
              updatedAt: h.updatedAt,
              location: h.center?.coordinates, // [lng, lat]
              isLive: h.reports.length > 0,
              reports: h.reports.length,
            };
          });
          setHotspots(formatted);
        }
      } catch (err) {
        console.error("Error fetching hotspots:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHotspots();
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Function to redirect to Google Maps
  const openInMaps = (h: any) => {
    if (h?.location?.length === 2) {
      const [lng, lat] = h.location;
      const url = `https://www.google.com/maps/place/${lat},${lng}/@${lat},${lng},15z/data=!3m1!1e3`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="bg-[#1f1816] min-h-screen text-white font-sans pb-28">
      {/* Sticky Header */}
      <motion.header
        animate={{
          boxShadow: scrolled
            ? "0 8px 20px rgba(0,0,0,0.6)"
            : "0 2px 6px rgba(0,0,0,0.25)",
          backdropFilter: "saturate(120%) blur(6px)",
        }}
        transition={{ duration: 0.25 }}
        className="sticky top-0 z-40 bg-[#2b2320]/55 border-b border-[#3a2f2d] px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-[#372a28]/80 hover:bg-[#443331] transition"
          >
            <Menu size={22} />
          </button>

          <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

          <div>
            <h1 className="font-bold text-base sm:text-lg">Live Hazard Map</h1>
            <p className="text-xs sm:text-sm text-[#d8cdc6] flex items-center">
              <MapPin size={14} className="mr-1" /> {userLocation}
            </p>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => window.location.reload()}
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#372a28] flex items-center justify-center transition-transform"
        >
          <RefreshCw size={18} />
        </motion.button>
      </motion.header>

      <div className="px-4 sm:px-6 mt-5 max-w-5xl mx-auto w-full">
        {/* Hotspots List */}
        <div className="space-y-6">
          {loading
            ? Array(2)
                .fill(0)
                .map((_, idx) => (
                  <div key={idx} className="mb-4">
                    <SkeletonBlock className="h-6 w-1/2 mb-3" />
                    <SkeletonBlock className="h-40 sm:h-52 w-full" />
                  </div>
                ))
            : hotspots.map((h, i) => (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className="bg-gradient-to-b from-[#2a1e1c] to-[#1e1614] border border-[#3a2f2d] rounded-2xl overflow-hidden shadow-lg">
                    <CardContent className="p-4 sm:p-5">
                      <h2 className="font-semibold text-white capitalize mt-1 mb-2 text-sm sm:text-base md:text-lg">
                        {h.title}
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-3 text-xs sm:text-sm text-[#bfb2ac]">
                        <p>Reports: {h.reports}</p>
                        <p>Detected: {new Date(h.createdAt).toLocaleString()}</p>
                        <p>Updated: {new Date(h.updatedAt).toLocaleString()}</p>
                      </div>

                      <div className="flex items-center gap-1.5 mt-2 mb-3">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            h.isLive ? "bg-red-500 animate-pulse" : "bg-gray-500"
                          }`}
                        ></span>
                        <span
                          className={`text-xs font-medium ${
                            h.isLive ? "text-red-300" : "text-gray-400"
                          }`}
                        >
                          {h.isLive ? "Live" : "Not Live"}
                        </span>
                      </div>

                      {/* ✅ Responsive Map Preview */}
                      {isLoaded &&
                        h.location &&
                        h.location.length === 2 && (
                          <div className="w-full h-40 sm:h-52 md:h-64 lg:h-72 rounded-xl overflow-hidden mb-4 border border-[#3a2f2d]">
                            <GoogleMap
                              mapContainerStyle={{ width: "100%", height: "100%" }}
                              center={{
                                lat: Number(h.location[1]),
                                lng: Number(h.location[0]),
                              }}
                              zoom={15}
                              options={{
                                styles: darkMapStyle,
                                disableDefaultUI: true,
                                zoomControl: false,
                                draggable: false,
                                scrollwheel: false,
                              }}
                              onClick={() => openInMaps(h)}
                            >
                              <Marker
                                position={{
                                  lat: Number(h.location[1]),
                                  lng: Number(h.location[0]),
                                }}
                                onClick={() => openInMaps(h)}
                              />
                            </GoogleMap>
                          </div>
                        )}

                      {/* ✅ Responsive Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 mt-3">
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          className="flex-1 flex items-center justify-center bg-white text-black font-semibold py-2.5 rounded-full hover:scale-[1.02] transition-transform"
                          onClick={() =>
                            navigate(`/dashboard/hazard/${h.id}/details`)
                          }
                        >
                          View Details
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          className="flex-1 flex items-center justify-center bg-[#2b2320] border border-[#3a2f2d] text-white font-semibold py-2.5 rounded-full hover:bg-[#3b3230] transition-colors"
                          onClick={() => openInMaps(h)} // ✅ Directly open Google Maps
                        >
                          View on Map
                        </motion.button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
        </div>
      </div>

      {/* ✅ Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
