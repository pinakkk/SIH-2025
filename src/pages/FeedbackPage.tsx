// src/pages/Feedback.tsx
import React, { useState } from "react";

const Feedback: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [topic, setTopic] = useState<string>("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const topics = [
    "Bug Report",
    "Concern",
    "Review",
    "General Feedback",
    "Feature Request",
    "Others",
  ];

  const emojis = [
    { id: 1, icon: "😡", label: "Very Bad" },
    { id: 2, icon: "😏", label: "Bad" },
    { id: 3, icon: "🙄", label: "Okay" },
    { id: 4, icon: "😁", label: "Good" },
    { id: 5, icon: "🥰", label: "Excellent" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ rating, topic, message, file });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1b140e] text-white px-4 sm:px-6 py-8">
      <div className="max-w-2xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="flex items-center">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2b2420] hover:bg-[#3b3430] text-white mr-3 transition-colors">
            ←
          </button>
          <h1 className="text-2xl font-semibold">Submit Feedback</h1>
        </div>

        {/* Rating */}
        <div>
          <h2 className="text-lg font-medium mb-4 text-gray-300">
            How would you rate your experience?
          </h2>
          <div className="flex justify-between max-w-md mx-auto">
            {emojis.map((emoji) => (
              <button
                key={emoji.id}
                onClick={() => setRating(emoji.id)}
                className={`text-4xl transition-all duration-300 hover:scale-110 ${
                  rating === emoji.id 
                    ? "scale-110 brightness-125" 
                    : "opacity-80 hover:opacity-100 hover:brightness-110"
                }`}
              >
                {emoji.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Topics */}
        <div>
          <h2 className="text-lg font-medium mb-4 text-gray-300">Select Feedback Topic</h2>
          <div className="flex flex-wrap gap-3">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setTopic(t)}
                className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 ${
                  topic === t
                    ? "bg-gradient-to-r from-[#F57F01] via-[#F89103] to-[#FFC008] text-black shadow-lg"
                    : "bg-[#2b2420] text-gray-400 hover:bg-[#3b3430]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <div>
          <h2 className="text-lg font-medium mb-4 text-gray-300">Tell us more</h2>
          <textarea
            placeholder="Tell us more in depth..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full min-h-[120px] rounded-2xl bg-[#2b2420] text-white px-4 py-3 
                     focus:outline-none focus:border-[#F57F01] focus:ring-1 focus:ring-[#F89103] 
                     border border-gray-700 placeholder-gray-400 transition-all text-sm"
          />
        </div>

        {/* File Upload */}
        <div>
          <h2 className="text-lg font-medium mb-4 text-gray-300">
            Attach screenshots or files
          </h2>
          <label className="flex flex-col items-center justify-center w-full h-28 rounded-2xl 
                         bg-[#2b2420] cursor-pointer hover:bg-[#3b3430] transition-colors 
                         border border-gray-700">
            <div className="flex flex-col items-center">
              <span className="text-gray-400 text-sm mb-1">
                {file ? file.name : "Drop your files here or click to upload"}
              </span>
              <span className="text-xs text-gray-500">Maximum file size: 10MB</span>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            />
          </label>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-3xl font-semibold 
                  bg-gradient-to-r from-[#F57F01] via-[#F89103] to-[#FFC008] 
                  text-black flex items-center justify-center shadow-lg 
                  hover:opacity-90 hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default Feedback;
