import React, { useState, useRef, useEffect } from "react";
import { Send, User } from "lucide-react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import chatbotIcon from "../../assets/icons/chatbot.png";

// Message type definition
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Suggested questions for quick access
const suggestedQuestions = [
  "What should I do during an earthquake?",
  "How to prepare an emergency kit?",
  "Flood safety protocols",
  "Emergency contact numbers",
  "First aid during disasters",
  "Evacuation procedures",
];

// Skeleton loader component
const SkeletonLoader = ({ className = "" }: { className?: string }) => (
  <div className={`bg-[#2a2320] animate-pulse rounded-xl ${className}`} />
);

// Typing indicator component
const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="flex items-start gap-3 px-1 py-2"
  >
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2 }}
      className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-[#2b2320] to-[#241c1a] border border-[#3a2f2d] shadow-lg overflow-hidden"
    >
      <img 
        src={chatbotIcon} 
        alt="Chatbot" 
        className="w-full h-full object-cover rounded-full" 
      />
    </motion.div>
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="p-4 rounded-2xl bg-gradient-to-br from-[#2b2320] to-[#241c1a] border border-[#3a2f2d] rounded-tl-md shadow-lg max-w-[240px]"
    >
      <div className="flex items-center gap-1.5 px-2">
        <motion.span 
          className="w-2 h-2 rounded-full bg-blue-400"
          animate={{ 
            opacity: [0.4, 1, 0.4],
            y: [0, -3, 0]
          }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.span 
          className="w-2 h-2 rounded-full bg-blue-400"
          animate={{ 
            opacity: [0.4, 1, 0.4],
            y: [0, -3, 0]
          }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity,
            delay: 0.2,
            ease: "easeInOut"
          }}
        />
        <motion.span 
          className="w-2 h-2 rounded-full bg-blue-400"
          animate={{ 
            opacity: [0.4, 1, 0.4],
            y: [0, -3, 0]
          }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity,
            delay: 0.4,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  </motion.div>
);

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "👋 Hello! I'm your Rescue Saathi assistant. I'm here to help you with disaster management information and emergency protocols. ",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // API key for Gemini
  const GEMINI_API_KEY = "AIzaSyCx86or2vtafXGPmSqVgWWhbzfJmliWT1Y";

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Call Gemini API
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": GEMINI_API_KEY,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are Rescue Saathi, a helpful disaster management assistant. 
                    Provide concise, helpful information about disasters, safety protocols, and emergency responses.
                    User query: ${input}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      // Extract the response text
      const botMessageText = data.candidates[0]?.content?.parts[0]?.text || 
                            "Sorry, I couldn't process that request. Please try again.";

      // Add bot message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botMessageText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Updated styles for user messages and buttons to match Dashboard gradient
  const userMessageStyle = "bg-gradient-to-b from-[#2a1e1c] to-[#1e1614] text-white";
  const botMessageStyle = "bg-gradient-to-b from-[#2b2320] to-[#241c1a] text-white";
  const sendButtonStyle = "bg-gradient-to-b from-[#2a1e1c] to-[#1e1614] hover:from-[#372a28] hover:to-[#2b2320]";

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#2a1e1c] to-[#1e1614] text-white">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-8 space-y-8 custom-scrollbar">
        
        {/* Initial loading skeleton */}
        {initialLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-start">
              <div className="flex items-start gap-2 max-w-[75%]">
                <SkeletonLoader className="w-8 h-8 rounded-full flex-shrink-0" />
                <div className="space-y-2">
                  <SkeletonLoader className="h-4 w-64" />
                  <SkeletonLoader className="h-4 w-48" />
                  <SkeletonLoader className="h-4 w-56" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonLoader key={i} className="h-20 rounded-xl" />
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Actual content */}
        {!initialLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
        {/* Welcome message with suggested questions */}
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="grid grid-cols-2 gap-3 mt-6 mb-8 sm:grid-cols-3"
          >
            {suggestedQuestions.map((question, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                onClick={() => {
                  setInput(question);
                  handleSend();
                }}
                className="relative p-3 text-xs text-left rounded-2xl overflow-hidden
                           bg-gradient-to-br from-[#262626] to-[#1f1f1f]
                           border border-[#404040] 
                           text-white font-normal
                           transition-all duration-200 transform hover:scale-[1.01] 
                           hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]
                           hover:border-[#005c4b]/50 hover:bg-gradient-to-br hover:from-[#2a2a2a] hover:to-[#232323]
                           active:scale-[0.99] line-clamp-3 h-[4.5rem]
                           focus:outline-none focus:ring-1 focus:ring-[#005c4b]/30"
              >
                <span className="relative z-10 leading-tight">{question}</span>
                <div className="absolute inset-0 bg-gradient-to-br from-[#005c4b]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200" />
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Chat messages */}
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.2,
                ease: "easeOut"
              }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } mb-6 last:mb-4`}
            >
              <div
                className={`flex max-w-[85%] md:max-w-[75%] items-end gap-2 ${
                  message.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <motion.div
                  className={`relative px-4 py-3 ${
                    message.sender === "user"
                      ? `${userMessageStyle} rounded-2xl rounded-br-md shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]`
                      : `${botMessageStyle} rounded-2xl rounded-bl-md border border-[#3a3a3a] shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.18)]`
                  } transition-all duration-300 backdrop-blur-sm group`}
                >
                  <p className="text-[14px] leading-relaxed whitespace-pre-wrap">
                    {message.text}
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1 opacity-60 group-hover:opacity-80 transition-opacity">
                    <p className="text-[10px] font-normal tracking-wide">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
               <div
  className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center relative group overflow-hidden ${
    message.sender === "user"
      ? "bg-gradient-to-br from-[#F57c00] to-[#F57c00] shadow-[0_2px_6px_rgba(0,0,0,0.15)] hover:shadow-[0_3px_10px_rgba(0,0,0,0.25)]"
      : "bg-gradient-to-br from-[#F57c00] to-[#F57c00] border border-[#F57c00] shadow-[0_2px_6px_rgba(0,0,0,0.12)] hover:shadow-[0_3px_10px_rgba(0,0,0,0.20)]"
  } transition-all duration-300 hover:scale-105`}
>
  {message.sender === "user" ? (
    <>
      <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <User
        size={14}
        className="text-emerald-100/90 relative z-10 transition-colors duration-300 group-hover:text-emerald-50"
      />
    </>
  ) : (
    <>
      <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <img
        src={chatbotIcon}
        alt="Chatbot"
        className="w-full h-full object-cover rounded-full relative z-10 transition-opacity duration-300 group-hover:opacity-90"
      />
    </>
  )}
</div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading indicator */}
        <AnimatePresence>
          {loading && (
            <TypingIndicator />
          )}
        </AnimatePresence>
            <div ref={messagesEndRef} />
          </motion.div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-[#3a2f2d] px-4 py-4 bg-gradient-to-b from-[#1f1816]/80 to-[#1a1512]/60 backdrop-blur-sm">
        <div className="relative flex items-end gap-3 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full pl-4 pr-12 py-3
                       rounded-3xl
                       bg-[#262626] 
                       border border-[#404040]
                       text-[14px] leading-relaxed text-white placeholder-gray-400
                       focus:outline-none focus:border-[#005c4b] focus:ring-1 focus:ring-[#005c4b]/20
                       hover:border-[#505050] hover:bg-[#2a2a2a]
                       transition-all duration-200
                       resize-none min-h-[2.75rem] max-h-24
                       custom-scrollbar overflow-hidden"
              rows={1}
              style={{ 
                scrollbarWidth: 'none'
              }}
            />

            {/* Character count or helper text */}
            {input.length > 100 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-2 right-14 text-xs text-gray-500/60"
              >
                {input.length}/500
              </motion.div>
            )}
          </div>
          
          <motion.button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            whileHover={input.trim() ? { scale: 1.02 } : {}}
            whileTap={input.trim() ? { scale: 0.98 } : {}}
            className={`w-10 h-10 rounded-full flex items-center justify-center transform transition-all duration-200 relative overflow-hidden flex-shrink-0
              ${!input.trim()
                ? "bg-[#404040] text-gray-500 cursor-not-allowed"
                : `${sendButtonStyle} text-white shadow-lg hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:shadow-[0_2px_8px_rgba(0,0,0,0.4)]`
            }`}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Icon icon="eos-icons:loading" className="text-sm" />
              </motion.div>
            ) : (
              <Send size={16} />
            )}
            
            {/* Glow effect when active */}
            {input.trim() && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#00d4aa]/20 to-[#005c4b]/20 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.button>
        </div>
      </div>



      {/* Custom scrollbar styles */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #1f1816;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #3a2f2d;
            border-radius: 20px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #4a403d;
          }
        `}
      </style>
    </div>
  );
}

export default Chatbot;