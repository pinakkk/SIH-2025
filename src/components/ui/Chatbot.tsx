// // By Pinak - UI enhanced with chat-style improvements

// import React, { useState, useRef, useEffect } from "react";
// import { Send, Paperclip, Smile } from "lucide-react";
// import { Icon } from "@iconify/react";
// import { motion, AnimatePresence } from "framer-motion";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import chatbotIcon from "../../assets/icons/chatbot.png";
// import { useAuth } from "@/hooks/use-auth";

// interface Message {
//   id: string;
//   text: string;
//   sender: "user" | "bot";
//   typing?: boolean;
//   timestamp: Date;
// }

// const suggestedQuestions = [
//   "What should I do during an earthquake?",
//   "How to prepare an emergency kit?",
//   "Flood safety protocols",
//   "Emergency contact numbers",
//   "First aid during disasters",
//   "Evacuation procedures",
// ];

// const typeText = (
//   fullText: string,
//   callback: (text: string) => void,
//   speed = 20
// ) => {
//   let index = 0;
//   const interval = setInterval(() => {
//     callback(fullText.slice(0, index));
//     index++;
//     if (index > fullText.length) clearInterval(interval);
//   }, speed);
// };

// const TypingIndicator = () => (
//   <div className="flex space-x-1 px-2 py-1">
//     {[0, 0.2, 0.4].map((d, i) => (
//       <motion.span
//         key={i}
//         className="w-2 h-2 bg-gray-300 rounded-full"
//         animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
//         transition={{
//           duration: 0.6,
//           repeat: Infinity,
//           delay: d,
//           ease: "easeInOut",
//         }}
//       />
//     ))}
//   </div>
// );

// export function Chatbot() {
//   const { user } = useAuth();
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: "welcome",
//       text: "👋 Hello! I'm your Rescue Saathi assistant. I'm here to help you with disaster management information and emergency protocols.",
//       sender: "bot",
//       timestamp: new Date(),
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     const timer = setTimeout(() => setInitialLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleSend = async (customInput?: string) => {
//     const text = customInput ?? input;
//     if (!text.trim()) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text,
//       sender: "user",
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     textareaRef.current?.blur();

//     const typingMessage: Message = {
//       id: (Date.now() + 1).toString(),
//       text: "",
//       sender: "bot",
//       typing: true,
//       timestamp: new Date(),
//     };
//     setMessages((prev) => [...prev, typingMessage]);

//     try {
//       const response = await fetch(
//         "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "X-goog-api-key": GEMINI_API_KEY,
//           },
//           body: JSON.stringify({
//             contents: [
//               {
//                 parts: [
//                   {
//                     text: `You are Rescue Saathi, a helpful disaster management assistant.
// - Always respond in a clear, human-like way. Always keep your responses short and maximum of 3 lines.
// User query: ${text}`,
//                   },
//                 ],
//               },
//             ],
//           }),
//         }
//       );

//       const data = await response.json();
//       const botMessageText =
//         data.candidates?.[0]?.content?.parts?.[0]?.text ||
//         "Sorry, I couldn't process that request. Please try again.";

//       typeText(botMessageText, (partial) => {
//         setMessages((prev) =>
//           prev.map((msg) =>
//             msg.id === typingMessage.id
//               ? { ...msg, typing: false, text: partial }
//               : msg
//           )
//         );
//       });
//     } catch (error) {
//       console.error("Gemini API Error:", error);
//       setMessages((prev) =>
//         prev.map((msg) =>
//           msg.id === typingMessage.id
//             ? { ...msg, typing: false, text: "⚠️ Sorry, something went wrong." }
//             : msg
//         )
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gradient-to-b from-[#2a1e1c] to-[#1e1614] text-white">
//       {/* Chat messages area */}
//       <div className="flex-1 overflow-y-auto px-4 pt-20 pb-28 space-y-5 custom-scrollbar">
//         {/* Suggested Questions */}
// {!initialLoading && messages.length === 1 && (
//   <motion.div
//     initial={{ opacity: 0, y: 10 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.3 }}
//     className="grid grid-cols-2 gap-2"  // ⬅️ reduced gap
//   >
//     {suggestedQuestions.map((q, i) => (
//       <motion.button
//         key={i}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => handleSend(q)}
//         className="p-4 text-sm text-left rounded-2xl bg-[#262626] border border-[#404040] 
//                    hover:border-[#f57f01] hover:text-[#f57f01] transition-all shadow-md"
//       >
//         {q}
//       </motion.button>
//     ))}
//   </motion.div>
// )}


//         {/* Messages */}
//         <AnimatePresence>
//           {messages.map((msg) => {
//             const time = msg.timestamp.toLocaleTimeString("en-IN", {
//               hour: "2-digit",
//               minute: "2-digit",
//             });

//             return (
//               <motion.div
//                 key={msg.id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//                 className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"
//                   }`}
//               >
//                 {msg.sender === "user" ? (
//                   <div className="flex flex-col items-end gap-1 max-w-[75%] self-end">
//                     <div
//                       className="px-4 py-3 rounded-2xl rounded-br-sm shadow-lg 
//                                  bg-gradient-to-b from-[#f57f01] to-[#f89103] text-black"
//                     >
//                       <div className="text-sm leading-relaxed">
//                         <ReactMarkdown remarkPlugins={[remarkGfm]}>
//                           {msg.text}
//                         </ReactMarkdown>
//                       </div>
//                     </div>
//                     <span className="text-[10px] text-gray-400">{time}</span>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-start gap-1 max-w-[75%]">
//                     <div className="flex gap-2 items-end">
//                       <img
//                         src={chatbotIcon}
//                         alt="Bot"
//                         className="w-8 h-8 rounded-full"
//                       />
//                       <div
//                         className="px-4 py-3 rounded-2xl rounded-bl-sm shadow-lg 
//                                    bg-gradient-to-b from-[#2b2320] to-[#1f1816] border border-[#3a3a3a]"
//                       >
//                         {msg.typing ? (
//                           <TypingIndicator />
//                         ) : (
//                           <div className="text-sm leading-relaxed">
//                             <ReactMarkdown remarkPlugins={[remarkGfm]}>
//                               {msg.text}
//                             </ReactMarkdown>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                     <span className="text-[10px] text-gray-500">{time}</span>
//                   </div>
//                 )}
//               </motion.div>
//             );
//           })}
//         </AnimatePresence>

//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input area pinned at bottom */}
//       <div className="fixed bottom-0 left-0 w-full border-t border-[#3a2f2d] px-4 py-3 bg-[#1f1816]/95 backdrop-blur-sm">
//         <div className="flex items-center gap-3 max-w-4xl mx-auto bg-[#262626] rounded-full px-3 py-2 border border-[#404040]">
//           <button className="text-gray-400 hover:text-white">
//             <Smile size={18} />
//           </button>
//           <textarea
//             ref={textareaRef}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Type a message..."
//             className="flex-1 px-3 py-2 bg-transparent text-sm text-white resize-none focus:outline-none min-h-[36px] max-h-28 overflow-y-auto"
//             rows={1}
//           />
         
//           <motion.button
//             onClick={() => handleSend()}
//             disabled={loading || !input.trim()}
//             whileTap={{ scale: 0.95 }}
//             className={`w-10 h-10 rounded-full flex items-center justify-center transition ${!input.trim()
//                 ? "bg-[#404040] text-gray-500 cursor-not-allowed"
//                 : "bg-gradient-to-b from-[#f57f01] to-[#f89103] text-black shadow-md hover:shadow-lg"
//               }`}
//           >
//             {loading ? (
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//               >
//                 <Icon icon="eos-icons:loading" className="text-lg" />
//               </motion.div>
//             ) : (
//               <Send size={16} />
//             )}
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Chatbot;


import React, { useState, useRef, useEffect } from "react";
import { Send, Smile } from "lucide-react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import chatbotIcon from "../../assets/icons/chatbot.png";
import { useAuth } from "@/hooks/use-auth";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  typing?: boolean;
  timestamp: Date;
}

const suggestedQuestions = [
  "What should I do during an earthquake?",
  "How to prepare an emergency kit?",
  "Flood safety protocols",
  "Emergency contact numbers",
  "First aid during disasters",
  "Evacuation procedures",
];

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

const TypingIndicator = () => (
  <div className="flex space-x-1 px-2 py-1">
    {[0, 0.2, 0.4].map((d, i) => (
      <motion.span
        key={i}
        className="w-2 h-2 bg-gray-300 rounded-full"
        animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: d,
          ease: "easeInOut",
        }}
      />
    ))}
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
- Always respond in a clear, human-like way. Always keep your responses short and maximum of 3 lines.
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
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 pt-20 pb-28 space-y-5 custom-scrollbar max-w-4xl mx-auto w-full">
        {/* Suggested Questions */}
        {!initialLoading && messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {suggestedQuestions.map((q, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend(q)}
                className="p-3 sm:p-4 text-xs sm:text-sm text-left rounded-2xl 
                           bg-[#262626] border border-[#404040] 
                           hover:border-[#f57f01] hover:text-[#f57f01] 
                           transition-all shadow-md"
              >
                {q}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Messages */}
        <AnimatePresence>
          {messages.map((msg) => {
            const time = msg.timestamp.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex w-full ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "user" ? (
                  <div className="flex flex-col items-end gap-1 max-w-[90%] sm:max-w-[65%] self-end">
                    <div className="px-3 sm:px-4 py-2 sm:py-3 rounded-2xl rounded-br-sm shadow-lg 
                                    bg-gradient-to-b from-[#f57f01] to-[#f89103] text-black">
                      <div className="text-sm leading-relaxed">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400">{time}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-start gap-1 max-w-[90%] sm:max-w-[65%]">
                    <div className="flex gap-2 items-end">
                      <img
                        src={chatbotIcon}
                        alt="Bot"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
                      />
                      <div className="px-3 sm:px-4 py-2 sm:py-3 rounded-2xl rounded-bl-sm shadow-lg 
                                      bg-gradient-to-b from-[#2b2320] to-[#1f1816] border border-[#3a3a3a]">
                        {msg.typing ? (
                          <TypingIndicator />
                        ) : (
                          <div className="text-sm leading-relaxed">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {msg.text}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-500">{time}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input area pinned at bottom */}
      <div className="fixed bottom-0 left-0 w-full border-t border-[#3a2f2d] px-3 sm:px-4 py-2 sm:py-3 bg-[#1f1816]/95 backdrop-blur-sm">
        <div className="flex items-center gap-2 sm:gap-3 max-w-4xl mx-auto w-full bg-[#262626] rounded-full px-2 sm:px-3 py-1 sm:py-2 border border-[#404040]">
          <button className="text-gray-400 hover:text-white">
            <Smile size={18} />
          </button>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 px-2 sm:px-3 py-2 bg-transparent text-sm text-white resize-none focus:outline-none min-h-[36px] max-h-28 overflow-y-auto"
            rows={1}
          />
          <motion.button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            whileTap={{ scale: 0.95 }}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition ${
              !input.trim()
                ? "bg-[#404040] text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-b from-[#f57f01] to-[#f89103] text-black shadow-md hover:shadow-lg"
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
