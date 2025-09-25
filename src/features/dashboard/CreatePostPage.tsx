import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowLeft, ImagePlus, Loader2 } from "lucide-react";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { useNavigate } from "react-router-dom";

export function CreatePostPage() {
  const navigate = useNavigate();

  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(-1); // go back to previous page
    }, 1500);
  };

  return (
    <div className="bg-[#1f1816] min-h-screen text-white font-sans pb-28">
      {/* Sticky Header */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-[#2b2320]/70 backdrop-blur-md border-b border-[#3a2f2d] px-5 py-4 flex items-center gap-4"
      >
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-[#372a28] flex items-center justify-center hover:scale-105 transition-transform"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-bold text-lg">Create Post</h1>
      </motion.header>

      {/* Content */}
      <div className="px-5 mt-5 space-y-5">
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
            className="w-full bg-transparent outline-none resize-none placeholder-gray-400 text-sm"
          />
        </motion.div>

        {/* Media Upload (Photo only) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#2b2320]/70 border border-[#3a2f2d] rounded-2xl p-4 shadow-lg"
        >
          <p className="text-sm mb-3 text-gray-300">Attach Photo</p>
          <label className="cursor-pointer flex items-center justify-center border-2 border-dashed border-[#3a2f2d] rounded-xl p-6 hover:bg-[#3a2f2d]/40 transition">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleMediaChange}
            />
            <div className="flex flex-col items-center text-gray-400">
              <ImagePlus size={22} />
              <span className="text-xs mt-1">Photo</span>
            </div>
          </label>
          {media && (
            <div className="mt-3 text-xs text-gray-400">
              Selected: {media.name}
            </div>
          )}
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#2b2320]/70 border border-[#3a2f2d] rounded-2xl p-4 shadow-lg flex items-center gap-3"
        >
          <MapPin size={18} className="text-gray-400" />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Add a location"
            className="flex-1 bg-transparent outline-none placeholder-gray-400 text-sm"
          />
        </motion.div>

        {/* Submit */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-2"
        >
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold py-3 rounded-full hover:opacity-90 transition flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
            ) : null}
            {loading ? "Posting..." : "Post"}
          </button>
        </motion.div>
      </div>

      {/* ✅ Reusable Bottom Nav */}
      <BottomNavigation />
    </div>
  );
}
