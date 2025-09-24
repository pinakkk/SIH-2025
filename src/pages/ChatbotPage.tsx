import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Chatbot } from "@/components/ui/Chatbot";
import { useNavigate } from "react-router-dom";

export function ChatbotPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1f1816] h-screen text-white font-sans flex flex-col overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="z-40 bg-[#2b2320]/90 border-b border-[#3a2f2d] px-5 py-4 flex items-center gap-4"
      >
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-lg bg-[#372a28]/80 hover:bg-[#443331] transition flex items-center justify-center"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="font-bold text-lg">Rescue Saathi Assistant</h1>
          <p className="text-sm text-[#d8cdc6]">Ask me anything about disasters</p>
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