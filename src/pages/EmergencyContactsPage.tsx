// src/pages/EmergencyContactsPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { ROUTES } from "@/lib/constants";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  isPrimary: boolean;
}

const EmergencyContactsPage: React.FC = () => {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900/20 text-white px-6 py-10">
      {/* Header */}
      <div className="flex w-full justify-between items-center mb-8">
        <button 
          onClick={() => navigate(ROUTES.EMERGENCY_MODE)}
          className="text-gray-300 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
        >
          <Icon icon="mdi:arrow-left" className="text-xl" />
        </button>
        <h1 className="text-xl font-semibold drop-shadow-md">Emergency Contacts</h1>
        <button 
          onClick={() => setShowAddContact(true)}
          className="text-orange-400 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
        >
          <Icon icon="mdi:plus" className="text-xl" />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-orange-300">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-green-500/20 backdrop-blur-md border border-green-500/30 rounded-2xl hover:bg-green-500/30 transition-all">
            <Icon icon="mdi:message-alert" className="text-2xl text-green-400 mb-2" />
            <span className="text-sm text-green-300">SMS All</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 rounded-2xl hover:bg-blue-500/30 transition-all">
            <Icon icon="mdi:phone-alert" className="text-2xl text-blue-400 mb-2" />
            <span className="text-sm text-blue-300">Call All</span>
          </button>
        </div>
      </div>

      {/* Contacts List */}
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-black font-bold text-lg">
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{contact.name}</h3>
                    {contact.isPrimary && (
                      <span className="px-2 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-xs text-orange-300">
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{contact.relation}</p>
                  <p className="text-gray-300 text-sm">{contact.phone}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCallContact(contact.phone, contact.name)}
                  className="p-3 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 transition-all"
                >
                  <Icon icon="mdi:phone" className="text-xl" />
                </button>
                <button
                  onClick={() => handleSetPrimary(contact.id)}
                  className={`p-3 rounded-full border transition-all ${
                    contact.isPrimary
                      ? "bg-orange-500/20 border-orange-500/30 text-orange-400"
                      : "bg-white/10 border-white/20 text-gray-400 hover:bg-white/20"
                  }`}
                >
                  <Icon icon="mdi:star" className="text-xl" />
                </button>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="p-3 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all"
                >
                  <Icon icon="mdi:delete" className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Add Emergency Contact</h3>
              <button
                onClick={() => setShowAddContact(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              >
                <Icon icon="mdi:close" className="text-xl" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2 font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Contact Name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2 font-medium">Phone</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2 font-medium">Relation</label>
                <input
                  type="text"
                  placeholder="e.g., Mother, Doctor, Friend"
                  value={newContact.relation}
                  onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddContact(false)}
                className="flex-1 py-3 rounded-2xl bg-white/10 border border-white/20 text-gray-300 font-medium hover:bg-white/20 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddContact}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold hover:opacity-90 transition-all"
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyContactsPage;