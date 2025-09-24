// // // By Pinak - Bug fixes, markdown fixes

import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import chatbotIcon from "../../assets/icons/chatbot.png";
import { useAuth } from "@/hooks/use-auth"; // Firebase auth hook

// Message type definition
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  typing?: boolean; // for typing animation bubble
  timestamp: Date;
}

// Suggested questions
const suggestedQuestions = [
  "What should I do during an earthquake?",
  "How to prepare an emergency kit?",
  "Flood safety protocols",
  "Emergency contact numbers",
  "First aid during disasters",
  "Evacuation procedures",
];

// Typing effect helper
const typeText = (
  fullText: string,
  callback: (text: string) => void,
  speed = 20
) => {
  let index = 0;
  const interval = setInterval(() => {
    callback(fullText.slice(0, index));
    index++;
    if (index > fullText.length) clearInterval(interval);
  }, speed);
};

// Typing indicator (Instagram-style dots)
const TypingIndicator = () => (
  <div className="flex space-x-1 px-2 py-1">
    <motion.span
      className="w-2 h-2 bg-gray-300 rounded-full"
      animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.span
      className="w-2 h-2 bg-gray-300 rounded-full"
      animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}
    />
    <motion.span
      className="w-2 h-2 bg-gray-300 rounded-full"
      animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
    />
  </div>
);

export function Chatbot() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "👋 Hello! I'm your Rescue Saathi assistant. I'm here to help you with disaster management information and emergency protocols.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Gemini API Key from env
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (customInput?: string) => {
    const text = customInput ?? input;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    textareaRef.current?.blur();

    // Add typing bubble immediately
    const typingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "",
      sender: "bot",
      typing: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, typingMessage]);

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
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
- Always respond in a clear, human-like way.
- Use short paragraphs or bullet points if useful.
- Give practical, step-by-step advice where possible.
- If the user asks for something that requires current or external info (e.g., "latest updates", "search", "today", "current situation"), tell them you're fetching real-time data and wait for the system to provide it.
User query: ${text}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const botMessageText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't process that request. Please try again.";

      // Replace typing bubble with animated response
      typeText(botMessageText, (partial) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === typingMessage.id
              ? { ...msg, typing: false, text: partial }
              : msg
          )
        );
      });
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === typingMessage.id
            ? { ...msg, typing: false, text: "⚠️ Sorry, something went wrong." }
            : msg
        )
      );
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

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#2a1e1c] to-[#1e1614] text-white">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto px-4 pt-24 pb-28 space-y-6 custom-scrollbar">

        {/* Suggested Questions */}
        {!initialLoading && messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3"
          >
            {suggestedQuestions.map((q, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSend(q)}
                className="p-3 text-xs text-left rounded-2xl bg-[#262626] border border-[#404040] hover:border-[#005c4b]/50 hover:bg-[#2a2a2a] transition-all"
              >
                {q}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Messages */}
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
            >
              {msg.sender === "user" ? (
                <div className="flex items-end gap-2 max-w-[70%]">
                  <div className="px-4 py-3 rounded-2xl rounded-br-md shadow-md bg-gradient-to-b from-[#2a1e1c] to-[#1e1614]">
                    <div className="prose prose-invert text-sm leading-relaxed max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <img
                    src={user?.photoURL || "/default-avatar.png"}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              ) : (
                <div className="flex items-end gap-2 max-w-[70%]">
                  <img
                    src={chatbotIcon}
                    alt="Bot"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="px-4 py-3 rounded-2xl rounded-bl-md shadow-md bg-gradient-to-b from-[#2b2320] to-[#241c1a] border border-[#3a3a3a]">
                    {msg.typing ? (
                      <TypingIndicator />
                    ) : (
                      <div className="prose prose-invert text-sm leading-relaxed max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input area pinned FIXED at bottom */}
      <div className="fixed bottom-0 left-0 w-full border-t border-[#3a2f2d] px-4 py-3 bg-[#1f1816]/95 backdrop-blur-sm">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-3xl bg-[#262626] border border-[#404040] text-sm text-white resize-none focus:outline-none focus:border-[#005c4b] focus:ring-1 focus:ring-[#005c4b]/30 min-h-[44px] max-h-32 overflow-y-auto"
            rows={1}
          />
          <motion.button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition ${!input.trim()
                ? "bg-[#404040] text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-b from-[#2a1e1c] to-[#1e1614] text-white shadow-md hover:shadow-lg"
              }`}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Icon icon="eos-icons:loading" className="text-lg" />
              </motion.div>
            ) : (
              <Send size={16} />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
