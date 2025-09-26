// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/Card";
// import { ArrowLeft, MapPin, Calendar } from "lucide-react";

// // ✅ Skeleton block
// const SkeletonBlock = ({ className = "" }: { className?: string }) => (
//   <div className={`bg-[#2a2a2a] animate-pulse rounded-xl ${className}`} />
// );

// export function ReportDetailsPage() {
//   const { state: report }: any = useLocation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   // Simulate loading for smoother UX
//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (!report) {
//     return (
//       <div className="min-h-screen bg-[#1f1816] flex items-center justify-center text-white">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.4 }}
//           className="text-center"
//         >
//           <h2 className="text-xl font-bold">❌ No report details found</h2>
//           <button
//             onClick={() => navigate(-1)}
//             className="mt-4 px-4 py-2 bg-[#2e2a28] rounded-lg border border-[#3a2f2d] hover:bg-[#403633] transition"
//           >
//             Go Back
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#1f1816] min-h-screen text-white px-5 lg:px-20 xl:px-40 py-6">
//       {/* Back Button */}
//       <motion.button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-gray-300 hover:text-white mb-6"
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         <ArrowLeft size={18} /> Back
//       </motion.button>

//       {/* Skeleton Loader */}
//       {loading ? (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="space-y-6"
//         >
//           <SkeletonBlock className="h-16 w-1/3" />
//           <SkeletonBlock className="h-48 w-full" />
//           <SkeletonBlock className="h-6 w-2/3" />
//           <div className="grid grid-cols-2 gap-4">
//             <SkeletonBlock className="h-20 w-full" />
//             <SkeletonBlock className="h-20 w-full" />
//           </div>
//         </motion.div>
//       ) : (
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           {/* Report Card */}
//           <Card className="bg-gradient-to-b from-[#29201e] to-[#1d1514] border border-[#3a2f2d] rounded-2xl shadow-lg">
//             <CardContent className="p-5 lg:p-8">
//               {/* Header */}
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
//                 <div className="flex items-center gap-3">
//                   <motion.img
//                     src={
//                       report.user?.profilePic ||
//                       `https://i.pravatar.cc/60?u=${report.id}`
//                     }
//                     alt="profile"
//                     width={60}
//                     height={60}
//                     className="rounded-full border-2 border-[#3a2f2d]"
//                     initial={{ scale: 0.9, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     transition={{ duration: 0.4 }}
//                   />
//                   <div>
//                     <h2 className="font-semibold text-lg lg:text-xl">
//                       {report.user?.username || "Anonymous"}
//                     </h2>
//                     <p className="text-xs text-gray-400">
//                       {report.verified ? "✅ Verified Report" : "⚠️ Unverified"}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="text-sm text-gray-300 flex items-center gap-2">
//                   <Calendar size={16} />
//                   {new Date(report.createdAt).toLocaleString("en-IN", {
//                     dateStyle: "medium",
//                     timeStyle: "short",
//                   })}
//                 </div>
//               </div>

//               {/* Caption */}
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="text-sm lg:text-base text-[#e0d6d0] mb-5"
//               >
//                 {report.caption}
//               </motion.p>

//               {/* Photo */}
//               {report.photos?.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                   className="mb-5"
//                 >
//                   <img
//                     src={report.photos[0]}
//                     alt="report"
//                     className="w-full rounded-xl border border-[#3a2f2d] shadow-lg"
//                   />
//                 </motion.div>
//               )}

//               {/* Location */}
//               {report.location?.coordinates && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.35 }}
//                   className="text-sm text-gray-300 flex items-center gap-2 mb-4"
//                 >
//                   <MapPin size={16} />
//                   {report.location.coordinates[1]}, {report.location.coordinates[0]}
//                 </motion.div>
//               )}

//               {/* Extra info */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.4 }}
//                 className="grid grid-cols-2 gap-4 mt-6"
//               >
//                 <div className="bg-[#2e2a28] rounded-lg p-4 border border-[#3a2f2d] shadow-inner">
//                   <p className="text-xs text-gray-400">Hazard Type</p>
//                   <p className="text-sm font-medium">
//                     {report.hazardType || "N/A"}
//                   </p>
//                 </div>
//                 <div className="bg-[#2e2a28] rounded-lg p-4 border border-[#3a2f2d] shadow-inner">
//                   <p className="text-xs text-gray-400">Upvotes</p>
//                   <p className="text-sm font-medium">{report.upvotes || 0}</p>
//                 </div>
//               </motion.div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       )}
//     </div>
//   );
// }

// export default ReportDetailsPage;


import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  ShieldCheck,
  ShieldAlert,
  ChevronUp,
  AlertTriangle,
} from "lucide-react";

// ✅ Type Definition
interface Report {
  id: string;
  caption: string;
  verified: boolean;
  createdAt: string;
  hazardType?: string;
  upvotes?: number;
  photos?: string[];
  user?: {
    username: string;
    profilePic: string;
  };
  location?: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
}

// ✅ Reusable Info Block
const InfoBlock = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="bg-[#25201f] rounded-xl p-4 border border-[#3a2f2d] shadow-inner flex flex-col gap-1"
  >
    <p className="text-xs text-gray-400 flex items-center gap-1.5">
      {icon}
      {label}
    </p>
    <p className="text-sm font-semibold text-[#f5ede9]">{value}</p>
  </motion.div>
);

// ✅ Header Component
// ✅ Header Component
const ReportHeader = ({ report }: { report: Report }) => {
  const VerificationBadge = report.verified ? (
    <span className="flex items-center gap-1 text-xs text-green-300 bg-green-900/40 px-2 py-1 rounded-full">
      <ShieldCheck size={14} /> Verified
    </span>
  ) : (
    <span className="flex items-center gap-1 text-xs text-yellow-300 bg-yellow-900/40 px-2 py-1 rounded-full">
      <ShieldAlert size={14} /> Unverified
    </span>
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4 mt-2 sm:mt-4">
      {/* User Info */}
      <div className="flex items-center gap-4">
        <motion.img
          src={
            report.user?.profilePic ||
            `https://i.pravatar.cc/60?u=${report.id}`
          }
          alt="User profile"
          width={60}
          height={60}
          className="rounded-full border-2 border-[#4a3f3d] shadow-md"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
        <div>
          <h1 className="font-bold text-xl lg:text-2xl text-white">
            {report.user?.username || "Anonymous"}
          </h1>
          {VerificationBadge}
        </div>
      </div>

      {/* Date */}
      <div className="text-sm text-gray-400 flex items-center gap-2 pt-1 self-start sm:self-center">
        <Calendar size={16} />
        {new Date(report.createdAt).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </div>
    </div>
  );
};


// ✅ Skeleton Loader
const ReportDetailsSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-[#2a2a2a] rounded-full h-16 w-16" />
        <div className="space-y-2">
          <div className="bg-[#2a2a2a] rounded h-6 w-32" />
          <div className="bg-[#2a2a2a] rounded h-4 w-24" />
        </div>
      </div>
      <div className="bg-[#2a2a2a] rounded h-4 w-40" />
    </div>
    <div className="bg-[#2a2a2a] rounded-lg h-6 w-2/3" />
    <div className="bg-[#2a2a2a] rounded-xl h-64 w-full" />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-[#2a2a2a] rounded-xl h-20" />
      <div className="bg-[#2a2a2a] rounded-xl h-20" />
    </div>
  </div>
);

// --- Main Component ---
export function ReportDetailsPage() {
  const { state } = useLocation();
  const report = state as Report | null;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (!report && !loading) {
    return (
      <div className="min-h-screen bg-[#1f1816] flex items-center justify-center text-white p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-[#29201e] border border-[#3a2f2d] rounded-2xl shadow-xl"
        >
          <AlertTriangle className="mx-auto text-red-400 mb-3" size={40} />
          <h2 className="text-xl font-bold mb-2">Report Not Found</h2>
          <p className="text-gray-400 mb-6">
            The report details could not be loaded. Please try again.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-[#2e2a28] rounded-lg border border-[#3a2f2d] hover:bg-[#403633] transition-colors font-semibold"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#1f1816] min-h-screen text-white font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft size={18} />
          Back to Reports
        </motion.button>

        <AnimatePresence mode="wait">
          {loading || !report ? (
            <motion.div key="skeleton" exit={{ opacity: 0 }}>
              <ReportDetailsSkeleton />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="bg-gradient-to-b from-[#29201e] to-[#1d1514] border border-[#3a2f2d] rounded-2xl shadow-2xl overflow-hidden">
                <CardContent className="p-6 lg:p-8">
                  <motion.div variants={itemVariants}>
                    <ReportHeader report={report} />
                  </motion.div>

                  <motion.p
                    variants={itemVariants}
                    className="text-base text-[#e0d6d0] mb-6 leading-relaxed"
                  >
                    {report.caption}
                  </motion.p>

                  {report.photos?.[0] && (
                    <motion.div variants={itemVariants} className="mb-6">
                      <img
                        src={report.photos[0]}
                        alt="Report evidence"
                        className="w-full h-auto max-h-[450px] object-cover rounded-xl border border-[#3a2f2d] shadow-lg"
                      />
                    </motion.div>
                  )}

                  {report.location?.coordinates && (
                    <motion.a
                      variants={itemVariants}
                      href={`https://www.google.com/maps/search/?api=1&query=${report.location.coordinates[1]},${report.location.coordinates[0]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-300 flex items-center gap-2 mb-6 hover:text-blue-400 transition-colors"
                    >
                      <MapPin size={16} />
                      View Location on Map (
                      {report.location.coordinates[1].toFixed(3)},{" "}
                      {report.location.coordinates[0].toFixed(3)})
                    </motion.a>
                  )}

                  <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    <InfoBlock
                      icon={<ShieldAlert size={14} />}
                      label="Hazard Type"
                      value={report.hazardType || "Not Specified"}
                    />
                    <InfoBlock
                      icon={<ChevronUp size={14} />}
                      label="Upvotes"
                      value={report.upvotes || 0}
                    />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ReportDetailsPage;
