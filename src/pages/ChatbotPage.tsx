import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Chatbot } from "@/components/ui/Chatbot";
import { useNavigate } from "react-router-dom";

export function ChatbotPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 dark:bg-[#1f1816] h-screen text-gray-900 dark:text-white font-sans flex flex-col overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-40 
                   bg-white/90 dark:bg-[#2b2320]/80 
                   border-b border-gray-200 dark:border-[#3a2f2d] 
                   px-5 py-4 flex items-center gap-4 
                   shadow-sm backdrop-blur-md"
      >
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-lg 
                     bg-gray-100 dark:bg-[#372a28]/80 
                     hover:bg-gray-200 dark:hover:bg-[#443331] 
                     transition flex items-center justify-center 
                     border border-gray-300 dark:border-transparent"
        >
          <ArrowLeft size={20} className="text-gray-700 dark:text-white" />
        </button>
        <div>
          <h1 className="font-bold text-lg lg:text-xl">
            Rescue Saathi Assistant
          </h1>
          <p className="text-sm text-gray-600 dark:text-[#d8cdc6]">
            Ask me anything about disasters
          </p>
        </div>
      </motion.header>

      {/* Chatbot area */}
      <div className="flex-1 overflow-hidden">
        <Chatbot />
      </div>
    </div>
  );
}

export default ChatbotPage;
