// src/pages/EmergencyContactsPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { ROUTES } from "@/lib/constants";
import AppLogo from '../assets/icons/rescue-saathi.png';

// ✅ Skeleton with rounded-xl by default
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div
    className={`bg-[#2a2a2a] animate-pulse rounded-xl ${className}`}
  />
);

interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  isPrimary: boolean;
}

const EmergencyContactsPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Mom",
      phone: "+91 9876543210",
      relation: "Mother",
      isPrimary: true,
    },
    {
      id: "2",
      name: "Dad",
      phone: "+91 9876543211",
      relation: "Father",
      isPrimary: false,
    },
    {
      id: "3",
      name: "Dr. Sharma",
      phone: "+91 9876543212",
      relation: "Family Doctor",
      isPrimary: false,
    },
  ]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relation: "",
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.phone && newContact.relation) {
      const contact: Contact = {
        id: Date.now().toString(),
        ...newContact,
        isPrimary: false,
      };
      setContacts([...contacts, contact]);
      setNewContact({ name: "", phone: "", relation: "" });
      setShowAddContact(false);
    }
  };

  const handleCallContact = (phone: string, name: string) => {
    // In a real app, this would initiate a call
    alert(`Calling ${name} at ${phone}`);
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleSetPrimary = (id: string) => {
    setContacts(contacts.map(contact => ({
      ...contact,
      isPrimary: contact.id === id
    })));
  };

  return (
    <div className="bg-[#1f1816] min-h-screen text-white font-sans flex flex-col">
      {/* Sticky Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-40 bg-[#2b2320]/85 backdrop-blur-md border-b border-[#3a2f2d] px-5 py-4 flex justify-between items-center"
      >
        {loading ? (
          <>
            <SkeletonBlock className="w-10 h-10 rounded-full" />
            <SkeletonBlock className="w-40 h-6" />
            <SkeletonBlock className="w-10 h-10 rounded-full" />
          </>
        ) : (
          <>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(ROUTES.EMERGENCY_MODE)}
              className="w-10 h-10 rounded-full bg-[#372a28] flex items-center justify-center hover:bg-[#4a403d] transition-colors"
            >
              <Icon icon="solar:arrow-left-outline" className="text-xl text-[#d8cdc6]" />
            </motion.button>
            <div className="flex items-center gap-3">
              <img
                src={AppLogo}
                alt="logo"
                className="w-8 h-8 rounded-md"
              />
              <h1 className="text-lg font-semibold">Emergency Contacts</h1>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddContact(true)}
              className="w-10 h-10 rounded-full bg-[#372a28] flex items-center justify-center hover:bg-[#4a403d] transition-colors"
            >
              <Icon icon="solar:add-circle-outline" className="text-xl text-orange-400" />
            </motion.button>
          </>
        )}
      </motion.header>

      {/* Main Content - Fixed Height with Scroll */}
      <div className="flex-1 px-5 py-6 max-h-[calc(100vh-80px)] overflow-hidden flex flex-col">
        {loading ? (
          <div className="space-y-6">
            {/* Quick Actions Skeleton */}
            <SkeletonBlock className="h-32 rounded-2xl" />
            
            {/* Contacts List Skeleton */}
            <div className="space-y-4">
              {Array(3).fill(0).map((_, i) => (
                <SkeletonBlock key={i} className="h-20 rounded-2xl" />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-[#2a2a2a] border border-[#3a2f2d] rounded-2xl p-5 mb-6 shadow-lg"
            >
              <h2 className="text-lg font-semibold mb-4 text-orange-300 flex items-center gap-2">
                <Icon icon="solar:bolt-bold" className="text-xl" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex flex-col items-center justify-center p-4 bg-green-500/20 border border-green-500/30 rounded-xl hover:bg-green-500/30 transition-all"
                >
                  <Icon icon="solar:chat-round-bold" className="text-2xl text-green-400 mb-2" />
                  <span className="text-sm text-green-300 font-medium">SMS All</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex flex-col items-center justify-center p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition-all"
                >
                  <Icon icon="solar:phone-calling-bold" className="text-2xl text-blue-400 mb-2" />
                  <span className="text-sm text-blue-300 font-medium">Call All</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Contacts List - Scrollable */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                  }
                }}
                className="space-y-4"
              >
                {contacts.map((contact) => (
                  <motion.div
                    key={contact.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="bg-[#2a2a2a] border border-[#3a2f2d] rounded-2xl p-4 hover:bg-[#353535] transition-all shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-black font-bold text-lg shadow-lg">
                          {contact.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg text-white">{contact.name}</h3>
                            {contact.isPrimary && (
                              <span className="px-2 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-xs text-orange-300 font-medium">
                                Primary
                              </span>
                            )}
                          </div>
                          <p className="text-[#bfb2ac] text-sm">{contact.relation}</p>
                          <p className="text-[#d8cdc6] text-sm font-mono">{contact.phone}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleCallContact(contact.phone, contact.name)}
                          className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 transition-all flex items-center justify-center"
                        >
                          <Icon icon="solar:phone-calling-bold" className="text-lg" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleSetPrimary(contact.id)}
                          className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center ${
                            contact.isPrimary
                              ? "bg-orange-500/20 border-orange-500/30 text-orange-400"
                              : "bg-[#372a28] border-[#3a2f2d] text-[#bfb2ac] hover:bg-[#4a403d]"
                          }`}
                        >
                          <Icon icon="solar:star-bold" className="text-lg" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteContact(contact.id)}
                          className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all flex items-center justify-center"
                        >
                          <Icon icon="solar:trash-bin-minimalistic-bold" className="text-lg" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </>
        )}
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-[#2a2a2a] border border-[#3a2f2d] rounded-2xl p-6 w-full max-w-md shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <Icon icon="solar:user-plus-bold" className="text-orange-400" />
                Add Emergency Contact
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowAddContact(false)}
                className="w-8 h-8 rounded-full bg-[#372a28] hover:bg-[#4a403d] transition-colors flex items-center justify-center"
              >
                <Icon icon="solar:close-circle-outline" className="text-lg text-[#d8cdc6]" />
              </motion.button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#d8cdc6] mb-2 font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Contact Name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1f1816] border border-[#3a2f2d] text-white placeholder-[#bfb2ac] focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-[#d8cdc6] mb-2 font-medium">Phone</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1f1816] border border-[#3a2f2d] text-white placeholder-[#bfb2ac] focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-[#d8cdc6] mb-2 font-medium">Relation</label>
                <input
                  type="text"
                  placeholder="e.g., Mother, Doctor, Friend"
                  value={newContact.relation}
                  onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1f1816] border border-[#3a2f2d] text-white placeholder-[#bfb2ac] focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAddContact(false)}
                className="flex-1 py-3 rounded-xl bg-[#372a28] border border-[#3a2f2d] text-[#d8cdc6] font-medium hover:bg-[#4a403d] transition-all"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddContact}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold hover:from-orange-600 hover:to-yellow-500 transition-all shadow-lg"
              >
                Add Contact
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default EmergencyContactsPage;