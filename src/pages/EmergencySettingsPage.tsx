// src/pages/EmergencySettingsPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { ROUTES } from "@/lib/constants";
import { useTheme } from "@/hooks/use-theme";

interface EmergencySettings {
  autoCallDelay: number; // seconds
  locationSharing: boolean;
  smsAlerts: boolean;
  soundAlerts: boolean;
  vibrationAlerts: boolean;
  emergencyMessage: string;
  quickDial: string[];
  medicalInfo: {
    bloodType: string;
    allergies: string;
    medications: string;
    conditions: string;
  };
}

const EmergencySettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [settings, setSettings] = useState<EmergencySettings>({
    autoCallDelay: 10,
    locationSharing: true,
    smsAlerts: true,
    soundAlerts: true,
    vibrationAlerts: true,
    emergencyMessage: "This is an emergency! I need immediate help. My location is being shared.",
    quickDial: ["112", "101", "102"],
    medicalInfo: {
      bloodType: "O+",
      allergies: "None",
      medications: "None",
      conditions: "None",
    },
  });

  const [activeTab, setActiveTab] = useState<'general' | 'medical' | 'contacts'>('general');

  const updateSetting = (key: keyof EmergencySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateMedicalInfo = (key: keyof EmergencySettings['medicalInfo'], value: string) => {
    setSettings(prev => ({
      ...prev,
      medicalInfo: { ...prev.medicalInfo, [key]: value }
    }));
  };

  const saveSettings = () => {
    // In real app, save to backend/localStorage
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-purple-900/20 text-gray-900 dark:text-white px-6 py-10">
      {/* Header */}
      <div className="flex w-full justify-between items-center mb-8">
        <button 
          onClick={() => navigate(ROUTES.EMERGENCY_MODE)}
          className="text-gray-600 dark:text-gray-300 p-3 rounded-full bg-gray-100 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
        >
          <Icon icon="mdi:arrow-left" className="text-xl" />
        </button>
        <h1 className="text-xl font-semibold dark:drop-shadow-md">Emergency Settings</h1>
        <button 
          onClick={saveSettings}
          className="text-green-600 dark:text-green-400 p-3 rounded-full bg-gray-100 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
        >
          <Icon icon="mdi:check" className="text-xl" />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-2 mb-6">
        {[
          { id: 'general', label: 'General', icon: 'mdi:cog' },
          { id: 'medical', label: 'Medical', icon: 'mdi:medical-bag' },
          { id: 'contacts', label: 'Quick Dial', icon: 'mdi:phone-dial' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
              activeTab === tab.id
                ? "bg-orange-500/10 dark:bg-orange-500/20 border border-orange-500/20 dark:border-orange-500/30 text-orange-600 dark:text-orange-300"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10"
            }`}
          >
            <Icon icon={tab.icon} />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          {/* Auto Call Delay */}
          <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-orange-600 dark:text-orange-300">Emergency Call Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Auto-call delay: {settings.autoCallDelay} seconds
                </label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={settings.autoCallDelay}
                  onChange={(e) => updateSetting('autoCallDelay', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                  <span>5s</span>
                  <span>30s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alert Settings */}
          <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-300">Alert Preferences</h3>
            <div className="space-y-4">
              {[
                { key: 'locationSharing', label: 'Automatic location sharing', icon: 'mdi:map-marker' },
                { key: 'smsAlerts', label: 'SMS notifications', icon: 'mdi:message-alert' },
                { key: 'soundAlerts', label: 'Sound alerts', icon: 'mdi:volume-high' },
                { key: 'vibrationAlerts', label: 'Vibration alerts', icon: 'mdi:vibrate' },
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon icon={setting.icon} className="text-xl text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-800 dark:text-white">{setting.label}</span>
                  </div>
                  <button
                    onClick={() => updateSetting(setting.key as keyof EmergencySettings, !settings[setting.key as keyof EmergencySettings])}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings[setting.key as keyof EmergencySettings] ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings[setting.key as keyof EmergencySettings] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Message */}
          <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-green-600 dark:text-green-300">Emergency Message</h3>
            <textarea
              value={settings.emergencyMessage}
              onChange={(e) => updateSetting('emergencyMessage', e.target.value)}
              className="w-full h-24 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all resize-none"
              placeholder="Enter your emergency message..."
            />
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              This message will be sent to your emergency contacts.
            </p>
          </div>
        </div>
      )}

      {/* Medical Information */}
      {activeTab === 'medical' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-red-600 dark:text-red-300">Medical Information</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              This information will be shared with emergency responders to provide better care.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium">Blood Type</label>
                <select
                  value={settings.medicalInfo.bloodType}
                  onChange={(e) => updateMedicalInfo('bloodType', e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-all"
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                    <option key={type} value={type} className={`${isDark ? 'bg-gray-800' : 'bg-white'}`}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium">Allergies</label>
                <input
                  type="text"
                  value={settings.medicalInfo.allergies}
                  onChange={(e) => updateMedicalInfo('allergies', e.target.value)}
                  placeholder="List any allergies (e.g., Penicillin, Nuts)"
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium">Current Medications</label>
                <input
                  type="text"
                  value={settings.medicalInfo.medications}
                  onChange={(e) => updateMedicalInfo('medications', e.target.value)}
                  placeholder="List current medications"
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium">Medical Conditions</label>
                <input
                  type="text"
                  value={settings.medicalInfo.conditions}
                  onChange={(e) => updateMedicalInfo('conditions', e.target.value)}
                  placeholder="List any medical conditions"
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Dial Settings */}
      {activeTab === 'contacts' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-yellow-600 dark:text-yellow-300">Quick Dial Numbers</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Configure emergency numbers for quick access.
            </p>
            
            <div className="space-y-4">
              {settings.quickDial.map((number, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-400 flex items-center justify-center text-black font-bold">
                    {index + 1}
                  </div>
                  <input
                    type="tel"
                    value={number}
                    onChange={(e) => {
                      const newQuickDial = [...settings.quickDial];
                      newQuickDial[index] = e.target.value;
                      updateSetting('quickDial', newQuickDial);
                    }}
                    placeholder="Emergency number"
                    className="flex-1 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all"
                  />
                  <button className="p-3 rounded-full bg-green-500/10 dark:bg-green-500/20 border border-green-500/20 dark:border-green-500/30 text-green-600 dark:text-green-400 hover:bg-green-500/20 dark:hover:bg-green-500/30 transition-all">
                    <Icon icon="mdi:phone" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => updateSetting('quickDial', [...settings.quickDial, ''])}
              className="w-full mt-4 py-3 rounded-2xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Icon icon="mdi:plus" />
              Add Quick Dial Number
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencySettingsPage;