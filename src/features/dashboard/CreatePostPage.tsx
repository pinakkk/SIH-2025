// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { MapPin, ArrowLeft, ImagePlus, Loader2 } from "lucide-react";
// import { BottomNavigation } from "@/components/layout/BottomNavigation";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export function CreatePostPage() {
//   const navigate = useNavigate();

//   const [caption, setCaption] = useState("");
//   const [hazardType, setHazardType] = useState("");
//   const [media, setMedia] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setMedia(e.target.files[0]);
//     }
//   };

//   const handleSubmit = () => {
//     if (!caption || !hazardType || !media) {
//       alert("Please add caption, hazard type, and a photo.");
//       return;
//     }

//     setLoading(true);

//     // 🔥 Get user's current location
//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         const { latitude, longitude } = pos.coords;

//         try {
//           const formData = new FormData();
//           formData.append("caption", caption);
//           formData.append("hazardType", hazardType);
//           formData.append("lng", longitude.toString());
//           formData.append("lat", latitude.toString());
//           formData.append("photos", media); // 👈 must match backend key name

//           const res = await axios.post(
//             "http://localhost:5002/api/create-post",
//             formData,
//             {
//               withCredentials: true,
//               headers: { "Content-Type": "multipart/form-data" },
//             }
//           );

//           console.log("✅ Post Created:", res.data);
//           setLoading(false);
//           navigate(-1);
//         } catch (err) {
//           console.error("❌ Error creating post:", err);
//           setLoading(false);
//         }
//       },
//       (err) => {
//         alert("Failed to fetch location. Please allow location access.");
//         setLoading(false);
//       }
//     );
//   };

//   return (
//     <div className="bg-[#1f1816] min-h-screen text-white font-sans pb-28">
//       {/* Sticky Header */}
//       <motion.header
//         initial={{ y: -30, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className="sticky top-0 z-40 bg-[#2b2320]/70 backdrop-blur-md border-b border-[#3a2f2d] px-5 py-4 flex items-center gap-4"
//       >
//         <button
//           onClick={() => navigate(-1)}
//           className="w-10 h-10 rounded-full bg-[#372a28] flex items-center justify-center hover:scale-105 transition-transform"
//         >
//           <ArrowLeft size={18} />
//         </button>
//         <h1 className="font-bold text-lg">Create Post</h1>
//       </motion.header>

//       {/* Content */}
//       <div className="px-5 mt-5 space-y-5">
//         {/* Caption */}
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-[#2b2320]/70 border border-[#3a2f2d] rounded-2xl p-4 shadow-lg"
//         >
//           <textarea
//             value={caption}
//             onChange={(e) => setCaption(e.target.value)}
//             placeholder="Write a caption..."
//             rows={4}
//             className="w-full bg-transparent outline-none resize-none placeholder-gray-400 text-sm"
//           />
//         </motion.div>

//         {/* Hazard Type Dropdown */}
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.15 }}
//           className="bg-[#2b2320]/70 border border-[#3a2f2d] rounded-2xl p-4 shadow-lg"
//         >
//           <label className="block text-sm text-gray-300 mb-2">
//             Select Hazard Type
//           </label>
//           <select
//             value={hazardType}
//             onChange={(e) => setHazardType(e.target.value)}
//             className="w-full bg-[#372a28] border border-[#3a2f2d] rounded-xl px-3 py-2 text-sm text-gray-200 outline-none"
//           >
//             <option value="">-- Choose Hazard --</option>
//             <option value="Tsunami">🌊 Tsunami</option>
//             <option value="Cyclone">🌪️ Cyclone</option>
//             <option value="Storm Surge">🌊 Storm Surge</option>
//             <option value="Rip Current">🌊 Rip Current</option>
//             <option value="Coastal Flood">🌊 Coastal Flood</option>
//             <option value="Oil Spill">🛢️ Oil Spill</option>
//             <option value="Marine Pollution">♻️ Marine Pollution</option>
//             <option value="Other">⚠️ Other</option>
//           </select>
//         </motion.div>

//         {/* Media Upload */}
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-[#2b2320]/70 border border-[#3a2f2d] rounded-2xl p-4 shadow-lg"
//         >
//           <p className="text-sm mb-3 text-gray-300">Attach Photo</p>
//           <label className="cursor-pointer flex items-center justify-center border-2 border-dashed border-[#3a2f2d] rounded-xl p-6 hover:bg-[#3a2f2d]/40 transition">
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleMediaChange}
//             />
//             <div className="flex flex-col items-center text-gray-400">
//               <ImagePlus size={22} />
//               <span className="text-xs mt-1">Photo</span>
//             </div>
//           </label>
//           {media && (
//             <div className="mt-3 text-xs text-gray-400">
//               Selected: {media.name}
//             </div>
//           )}
//         </motion.div>

//         {/* Submit */}
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="pt-2"
//         >
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold py-3 rounded-full hover:opacity-90 transition flex items-center justify-center"
//           >
//             {loading && <Loader2 className="animate-spin w-5 h-5 mr-2" />}
//             {loading ? "Posting..." : "Post"}
//           </button>
//         </motion.div>
//       </div>

//       {/* ✅ Bottom Navigation */}
//       <BottomNavigation />
//     </div>
//   );
// }

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowLeft, ImagePlus, Loader2 } from "lucide-react";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function CreatePostPage() {
  const navigate = useNavigate();

  const [caption, setCaption] = useState("");
  const [hazardType, setHazardType] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!caption || !hazardType || !media) {
      alert("Please add caption, hazard type, and a photo.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const formData = new FormData();
          formData.append("caption", caption);
          formData.append("hazardType", hazardType);
          formData.append("lng", longitude.toString());
          formData.append("lat", latitude.toString());
          formData.append("photos", media);

          const res = await axios.post(
            "http://localhost:5002/api/create-post",
            // "https://sih-2025-l3ur.onrender.com/api/create-post",
            formData,
            {
              withCredentials: true,
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          console.log("✅ Post Created:", res.data);
          setLoading(false);
          navigate(-1);
        } catch (err) {
          console.error("❌ Error creating post:", err);
          setLoading(false);
        }
      },
      (err) => {
        alert("Failed to fetch location. Please allow location access.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="bg-[#1f1816] min-h-screen text-white font-sans pb-28">
      {/* Sticky Header */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-[#2b2320]/70 backdrop-blur-md border-b border-[#3a2f2d] px-5 md:px-10 lg:px-16 py-4 flex items-center gap-4"
      >
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-[#372a28] flex items-center justify-center hover:scale-105 transition-transform"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-bold text-lg md:text-xl">Create Post</h1>
      </motion.header>

      {/* Content */}
      <div className="px-5 md:px-8 lg:px-12 mt-5">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Caption */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#2b2320]/70 border border-[#3a2f2d] rounded-2xl p-4 shadow-lg"
          >
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              rows={4}
              className="w-full bg-transparent outline-none resize-none placeholder-gray-400 text-sm md:text-base"
            />
          </motion.div>

          {/* Hazard Type Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[#2b2320]/70 border border-[#3a2f2d] rounded-2xl p-4 shadow-lg"
          >
            <label className="block text-sm md:text-base text-gray-300 mb-2">
              Select Hazard Type
            </label>
            <select
              value={hazardType}
              onChange={(e) => setHazardType(e.target.value)}
              className="w-full bg-[#372a28] border border-[#3a2f2d] rounded-xl px-3 py-2 text-sm md:text-base text-gray-200 outline-none"
            >
              <option value="">-- Choose Hazard --</option>
              <option value="Tsunami">🌊 Tsunami</option>
              <option value="Cyclone">🌪️ Cyclone</option>
              <option value="Storm Surge">🌊 Storm Surge</option>
              <option value="Rip Current">🌊 Rip Current</option>
              <option value="Coastal Flood">🌊 Coastal Flood</option>
              <option value="Oil Spill">🛢️ Oil Spill</option>
              <option value="Marine Pollution">♻️ Marine Pollution</option>
              <option value="Other">⚠️ Other</option>
            </select>
          </motion.div>

          {/* Media Upload */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#2b2320]/70 border border-[#3a2f2d] rounded-2xl p-4 shadow-lg"
          >
            <p className="text-sm md:text-base mb-3 text-gray-300">
              Attach Photo
            </p>
            <label className="cursor-pointer flex items-center justify-center border-2 border-dashed border-[#3a2f2d] rounded-xl p-6 hover:bg-[#3a2f2d]/40 transition">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleMediaChange}
              />
              <div className="flex flex-col items-center text-gray-400">
                <ImagePlus size={22} />
                <span className="text-xs md:text-sm mt-1">Photo</span>
              </div>
            </label>
            {media && (
              <div className="mt-3 text-xs md:text-sm text-gray-400">
                Selected: {media.name}
              </div>
            )}
          </motion.div>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-2"
          >
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold py-3 md:py-3.5 rounded-full hover:opacity-90 transition flex items-center justify-center"
            >
              {loading && <Loader2 className="animate-spin w-5 h-5 mr-2" />}
              {loading ? "Posting..." : "Post"}
            </button>
          </motion.div>
        </div>
      </div>

      {/* ✅ Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
