// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ArrowLeft, MapPin, Clock, AlertTriangle, User, RefreshCw, ExternalLink } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/Card";

// // Type definitions for better TypeScript support
// interface HazardReport {
//   _id: string;
//   user?: {
//     username: string;
//   };
//   hazardType: string;
//   caption?: string;
//   createdAt: string;
// }

// interface Hazard {
//   _id: string;
//   center?: {
//     coordinates: [number, number];
//   };
//   createdAt: string;
//   updatedAt: string;
//   reports: HazardReport[];
// }

// interface ApiResponse {
//   success: boolean;
//   data: Hazard[];
// }

// export function HazardDetailsPage() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [hazard, setHazard] = useState<Hazard | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchHazard = async () => {
//     if (!id) {
//       setError("No hazard ID provided");
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
      
//       const res = await fetch("https://sih-2025-l3ur.onrender.com/api/all-hotspot");
      
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
      
//       const data: ApiResponse = await res.json();

//       if (data.success) {
//         const found = data.data.find((h: Hazard) => h._id === id);
//         if (found) {
//           setHazard(found);
//         } else {
//           setError("Hazard not found");
//         }
//       } else {
//         setError("Failed to fetch hazard data");
//       }
//     } catch (err) {
//       console.error("Error fetching hazard:", err);
//       setError(err instanceof Error ? err.message : "An unknown error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHazard();
//   }, [id]);

//   // Loading state
//   if (loading) {
//     return (
//       <div className="h-screen flex flex-col items-center justify-center text-gray-400 text-lg bg-[#1f1816]">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//           className="mb-4"
//         >
//           <RefreshCw size={32} />
//         </motion.div>
//         <p>Loading hazard details...</p>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="h-screen flex flex-col items-center justify-center text-red-400 text-lg bg-[#1f1816] px-4">
//         <AlertTriangle size={48} className="mb-4" />
//         <p className="text-center mb-4">{error}</p>
//         <div className="space-x-3">
//           <button
//             onClick={fetchHazard}
//             className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition"
//           >
//             Retry
//           </button>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // No hazard found
//   if (!hazard) {
//     return (
//       <div className="h-screen flex flex-col items-center justify-center text-gray-400 text-lg bg-[#1f1816] px-4">
//         <AlertTriangle size={48} className="mb-4" />
//         <p className="text-center mb-4">Hazard not found</p>
//         <button
//           onClick={() => navigate(-1)}
//           className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   const formatCoordinates = (coords: [number, number]) => {
//     return `${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}`;
//   };

//   const openInMaps = () => {
//     if (hazard.center?.coordinates) {
//       const [lat, lng] = hazard.center.coordinates;
//       // Create a more descriptive URL with a marker and zoom level
//       const url = `https://www.google.com/maps/place/${lat},${lng}/@${lat},${lng},15z/data=!3m1!1e3`;
//       window.open(url, '_blank', 'noopener,noreferrer');
//     }
//   };

//   return (
//     <div className="bg-[#1f1816] min-h-screen text-white pb-20">
//       {/* Header */}
//       <motion.header
//         initial={{ y: -40, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.3 }}
//         className="sticky top-0 z-40 bg-[#2b2320]/80 backdrop-blur-lg border-b border-[#3a2f2d] px-4 py-4 flex items-center gap-3 shadow-md"
//       >
//         <button
//           onClick={() => navigate(-1)}
//           className="p-2 rounded-lg bg-[#372a28]/80 hover:bg-[#4a3836] transition active:scale-95"
//           aria-label="Go back"
//         >
//           <ArrowLeft size={20} />
//         </button>
//         <h1 className="font-bold text-lg tracking-wide">Hazard Details</h1>
//         <div className="ml-auto">
//           <button
//             onClick={fetchHazard}
//             className="p-2 rounded-lg bg-[#372a28]/80 hover:bg-[#4a3836] transition active:scale-95"
//             aria-label="Refresh data"
//           >
//             <RefreshCw size={16} />
//           </button>
//         </div>
//       </motion.header>

//       {/* Content */}
//       <div className="p-5 space-y-6">
//         {/* Main Hotspot Info */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           <Card className="bg-gradient-to-b from-[#2a1e1c] to-[#1b1413] border border-[#3a2f2d]/70 rounded-2xl shadow-2xl">
//             <CardContent className="p-5 space-y-3">
//               <h2 className="text-xl font-bold flex items-center gap-2 mt-3 mb-2 text-red-300">
//                 <AlertTriangle className="text-red-400" /> 
//                 Most Reported Hotspot
//               </h2>
//               <div className="space-y-3 text-sm">
//                 {hazard.center?.coordinates && (
//                   <div className="space-y-3">
//                     <p className="text-gray-300 flex items-center">
//                       <MapPin size={14} className="mr-2 text-orange-300" />
//                       {formatCoordinates(hazard.center.coordinates)}
//                     </p>
//                     <motion.button
//                       onClick={openInMaps}
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-b from-[#f89e2c] to-[#f37306] hover:from-[#f68b1f] hover:to-[#e06b05] text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25 border border-blue-500/20"
//                       title="Open location in Google Maps"
//                     >
//                       <MapPin size={16} className="text-blue-200" />
//                       View on Google Maps
//                       <ExternalLink size={14} className="text-blue-200" />
//                     </motion.button>
//                   </div>
//                 )}
//                 <p className="text-gray-400 flex items-center">
//                   <Clock size={14} className="mr-2" />
//                   Created: {new Date(hazard.createdAt).toLocaleString()}
//                 </p>
//                 <p className="text-gray-400 flex items-center">
//                   <Clock size={14} className="mr-2" />
//                   Updated: {new Date(hazard.updatedAt).toLocaleString()}
//                 </p>
//                 <div className="bg-[#3a2f2d]/30 rounded-lg p-3 mt-4">
//                   <p className="text-gray-300 font-medium text-center">
//                     Total Reports:{" "}
//                     <span className="text-orange-300 text-lg font-bold">
//                       {hazard.reports?.length || 0}
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {/* Reports Section */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4 border-b border-[#3a2f2d]/60 pb-2 flex items-center gap-2">
//             <User size={20} />
//             Reports ({hazard.reports?.length || 0})
//           </h3>
          
//           {hazard.reports?.length === 0 ? (
//             <Card className="bg-gradient-to-b from-[#2a1e1c] to-[#1b1413] border border-[#3a2f2d]/70 rounded-xl">
//               <CardContent className="p-6 text-center text-gray-400">
//                 <User size={32} className="mx-auto mb-2 opacity-50" />
//                 <p>No reports available for this hazard.</p>
//               </CardContent>
//             </Card>
//           ) : (
//             <div className="space-y-4">
//               {hazard.reports.map((report: HazardReport, index: number) => (
//                 <motion.div
//                   key={report._id}
//                   initial={{ opacity: 0, y: 15 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3, delay: index * 0.05 }}
//                 >
//                   <Card className="bg-gradient-to-b from-[#2a1e1c] to-[#1b1413] border border-[#3a2f2d]/70 rounded-xl shadow-lg hover:shadow-xl hover:border-orange-400/20 transition-all duration-200">
//                     <CardContent className="p-4 text-sm">
//                       <div className="flex justify-between items-start mb-3">
//                         <h4 className="font-medium text-white flex items-center gap-3 mt-1">
//                           <div className="w-8 h-8 bg-gradient-to-br from-orange-500/30 to-orange-600/20 rounded-full flex items-center justify-center border border-orange-400/30 flex-shrink-0">
//                             <User size={14} className="text-orange-300" />
//                           </div>
//                           <span className="leading-tight">
//                             {report.user?.username || "Anonymous User"}
//                           </span>
//                         </h4>
//                         <span className="text-[11px] text-gray-500 bg-[#3a2f2d]/30 px-2 py-1 rounded mt-1 flex-shrink-0">
//                           {new Date(report.createdAt).toLocaleDateString()} {new Date(report.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//                         </span>
//                       </div>
//                       <div className="bg-[#3a2f2d]/20 rounded-lg p-3">
//                         <p className="text-gray-300">
//                           <span className="inline-block bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs font-semibold mr-2">
//                             {report.hazardType}
//                           </span>
//                         </p>
//                         {report.caption && (
//                           <p className="mt-2 text-gray-300 italic">
//                             "{report.caption}"
//                           </p>
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Clock,
  AlertTriangle,
  User,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

interface HazardReport {
  _id: string;
  user?: {
    username: string;
  };
  hazardType: string;
  caption?: string;
  createdAt: string;
}

interface Hazard {
  _id: string;
  center?: {
    coordinates: [number, number];
  };
  createdAt: string;
  updatedAt: string;
  reports: HazardReport[];
}

interface ApiResponse {
  success: boolean;
  data: Hazard[];
}

export function HazardDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hazard, setHazard] = useState<Hazard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHazard = async () => {
    if (!id) {
      setError("No hazard ID provided");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        "https://sih-2025-l3ur.onrender.com/api/all-hotspot"
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: ApiResponse = await res.json();

      if (data.success) {
        const found = data.data.find((h: Hazard) => h._id === id);
        if (found) {
          setHazard(found);
        } else {
          setError("Hazard not found");
        }
      } else {
        setError("Failed to fetch hazard data");
      }
    } catch (err) {
      console.error("Error fetching hazard:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHazard();
  }, [id]);

  const formatCoordinates = (coords: [number, number]) => {
    return `${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}`;
  };

  const openInMaps = () => {
    if (hazard?.center?.coordinates) {
      const [lat, lng] = hazard.center.coordinates;
      const url = `https://www.google.com/maps/place/${lat},${lng}/@${lat},${lng},15z/data=!3m1!1e3`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-gray-400 text-lg bg-[#1f1816]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="mb-4"
        >
          <RefreshCw size={32} />
        </motion.div>
        <p>Loading hazard details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-red-400 text-lg bg-[#1f1816] px-4">
        <AlertTriangle size={48} className="mb-4" />
        <p className="text-center mb-4">{error}</p>
        <div className="space-x-3">
          <button
            onClick={fetchHazard}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition"
          >
            Retry
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!hazard) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-gray-400 text-lg bg-[#1f1816] px-4">
        <AlertTriangle size={48} className="mb-4" />
        <p className="text-center mb-4">Hazard not found</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#1f1816] min-h-screen text-white pb-20">
      {/* Header */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-40 bg-[#2b2320]/80 backdrop-blur-lg border-b border-[#3a2f2d] px-4 py-4 flex items-center gap-3 shadow-md"
      >
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg bg-[#372a28]/80 hover:bg-[#4a3836] transition active:scale-95"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-lg tracking-wide">Hazard Details</h1>
        <div className="ml-auto">
          <button
            onClick={fetchHazard}
            className="p-2 rounded-lg bg-[#372a28]/80 hover:bg-[#4a3836] transition active:scale-95"
            aria-label="Refresh data"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </motion.header>

      {/* Content Wrapper for responsiveness */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Grid layout on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Main Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-1"
          >
            <Card className="bg-gradient-to-b from-[#2a1e1c] to-[#1b1413] border border-[#3a2f2d]/70 rounded-2xl shadow-2xl h-full">
              <CardContent className="p-5 space-y-3">
                <h2 className="text-xl font-bold flex items-center gap-2 mt-3 mb-2 text-red-300">
                  <AlertTriangle className="text-red-400" />
                  Most Reported Hotspot
                </h2>
                <div className="space-y-3 text-sm">
                  {hazard.center?.coordinates && (
                    <div className="space-y-3">
                      <p className="text-gray-300 flex items-center">
                        <MapPin size={14} className="mr-2 text-orange-300" />
                        {formatCoordinates(hazard.center.coordinates)}
                      </p>
                      <motion.button
                        onClick={openInMaps}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-b from-[#f89e2c] to-[#f37306] hover:from-[#f68b1f] hover:to-[#e06b05] text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25 border border-blue-500/20"
                        title="Open location in Google Maps"
                      >
                        <MapPin size={16} className="text-blue-200" />
                        View on Google Maps
                        <ExternalLink size={14} className="text-blue-200" />
                      </motion.button>
                    </div>
                  )}
                  <p className="text-gray-400 flex items-center">
                    <Clock size={14} className="mr-2" />
                    Created: {new Date(hazard.createdAt).toLocaleString()}
                  </p>
                  <p className="text-gray-400 flex items-center">
                    <Clock size={14} className="mr-2" />
                    Updated: {new Date(hazard.updatedAt).toLocaleString()}
                  </p>
                  <div className="bg-[#3a2f2d]/30 rounded-lg p-3 mt-4">
                    <p className="text-gray-300 font-medium text-center">
                      Total Reports:{" "}
                      <span className="text-orange-300 text-lg font-bold">
                        {hazard.reports?.length || 0}
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: Reports Section */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 border-b border-[#3a2f2d]/60 pb-2 flex items-center gap-2">
              <User size={20} />
              Reports ({hazard.reports?.length || 0})
            </h3>

            {hazard.reports?.length === 0 ? (
              <Card className="bg-gradient-to-b from-[#2a1e1c] to-[#1b1413] border border-[#3a2f2d]/70 rounded-xl">
                <CardContent className="p-6 text-center text-gray-400">
                  <User size={32} className="mx-auto mb-2 opacity-50" />
                  <p>No reports available for this hazard.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hazard.reports.map((report: HazardReport, index: number) => (
                  <motion.div
                    key={report._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="bg-gradient-to-b from-[#2a1e1c] to-[#1b1413] border border-[#3a2f2d]/70 rounded-xl shadow-lg hover:shadow-xl hover:border-orange-400/20 transition-all duration-200">
                      <CardContent className="p-4 text-sm">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium text-white flex items-center gap-3 mt-1">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500/30 to-orange-600/20 rounded-full flex items-center justify-center border border-orange-400/30 flex-shrink-0">
                              <User size={14} className="text-orange-300" />
                            </div>
                            <span className="leading-tight">
                              {report.user?.username || "Anonymous User"}
                            </span>
                          </h4>
                          <span className="text-[11px] text-gray-500 bg-[#3a2f2d]/30 px-2 py-1 rounded mt-1 flex-shrink-0">
                            {new Date(
                              report.createdAt
                            ).toLocaleDateString()}{" "}
                            {new Date(report.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <div className="bg-[#3a2f2d]/20 rounded-lg p-3">
                          <p className="text-gray-300">
                            <span className="inline-block bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs font-semibold mr-2">
                              {report.hazardType}
                            </span>
                          </p>
                          {report.caption && (
                            <p className="mt-2 text-gray-300 italic">
                              "{report.caption}"
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
