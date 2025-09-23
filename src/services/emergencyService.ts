// src/services/emergencyService.ts
import { apiClient } from '@/lib/api-client';

export interface EmergencyContact {
  _id: string;
  name: string;
  phone: string;
  relation: string;
  isPrimary: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmergencySettings {
  _id: string;
  autoCallDelay: number;
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

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  address: string;
  timestamp?: number;
  battery?: number;
}

export interface EmergencyCall {
  _id: string;
  emergencyType: string;
  status: string;
  callStartTime: string;
  callEndTime?: string;
  duration: number;
  location?: LocationData;
  emergencyNumber: string;
  notes?: string;
}

// Emergency Contacts API
export const emergencyContactsAPI = {
  // Get all emergency contacts
  getContacts: async (): Promise<EmergencyContact[]> => {
    const response = await apiClient.get('/emergency/contacts');
    return response.data.contacts;
  },

  // Create new emergency contact
  createContact: async (contact: Omit<EmergencyContact, '_id' | 'isActive' | 'createdAt' | 'updatedAt'>): Promise<EmergencyContact> => {
    const response = await apiClient.post('/emergency/contacts', contact);
    return response.data.contact;
  },

  // Update emergency contact
  updateContact: async (contactId: string, contact: Partial<EmergencyContact>): Promise<EmergencyContact> => {
    const response = await apiClient.put(`/emergency/contacts/${contactId}`, contact);
    return response.data.contact;
  },

  // Delete emergency contact
  deleteContact: async (contactId: string): Promise<void> => {
    await apiClient.delete(`/emergency/contacts/${contactId}`);
  },
};

// Emergency Settings API
export const emergencySettingsAPI = {
  // Get emergency settings
  getSettings: async (): Promise<EmergencySettings> => {
    const response = await apiClient.get('/emergency/settings');
    return response.data.settings;
  },

  // Update emergency settings
  updateSettings: async (settings: Partial<EmergencySettings>): Promise<EmergencySettings> => {
    const response = await apiClient.put('/emergency/settings', settings);
    return response.data.settings;
  },
};

// Emergency Call API
export const emergencyCallAPI = {
  // Initiate emergency call
  initiateCall: async (callData: {
    emergencyType?: string;
    location?: LocationData;
    emergencyNumber?: string;
  }): Promise<EmergencyCall> => {
    const response = await apiClient.post('/emergency/call', callData);
    return response.data.call;
  },

  // Update emergency call
  updateCall: async (callId: string, updateData: {
    status?: string;
    duration?: number;
    notes?: string;
  }): Promise<EmergencyCall> => {
    const response = await apiClient.put(`/emergency/call/${callId}`, updateData);
    return response.data.call;
  },
};

// Location Sharing API
export const locationSharingAPI = {
  // Start location sharing
  startSharing: async (data: {
    contactIds: string[];
    location: LocationData;
  }): Promise<{ sessionId: string; locationShare: any }> => {
    const response = await apiClient.post('/emergency/location/start', data);
    return response.data;
  },

  // Update location
  updateLocation: async (sessionId: string, location: LocationData): Promise<void> => {
    await apiClient.put(`/emergency/location/${sessionId}`, { location });
  },

  // Stop location sharing
  stopSharing: async (sessionId: string): Promise<void> => {
    await apiClient.post(`/emergency/location/${sessionId}/stop`);
  },
};

// Emergency Alert API
export const emergencyAlertAPI = {
  // Create emergency alert
  createAlert: async (alertData: {
    alertType: string;
    severity?: string;
    message: string;
    location?: LocationData;
    notifyEmergencyServices?: boolean;
  }): Promise<any> => {
    const response = await apiClient.post('/emergency/alert', alertData);
    return response.data.alert;
  },

  // Send SOS alert
  sendSOS: async (location?: LocationData): Promise<any> => {
    const response = await apiClient.post('/emergency/sos', { location });
    return response.data;
  },
};

// Emergency Status API
export const emergencyStatusAPI = {
  // Get emergency status
  getStatus: async (): Promise<{
    hasActiveCall: boolean;
    activeCall?: EmergencyCall;
    hasActiveLocationSharing: boolean;
    activeLocationSession?: any;
  }> => {
    const response = await apiClient.get('/emergency/status');
    return response.data.status;
  },

  // Get emergency history
  getHistory: async (): Promise<{
    calls: EmergencyCall[];
    alerts: any[];
    locationSessions: any[];
  }> => {
    const response = await apiClient.get('/emergency/history');
    return response.data.history;
  },
};

// Utility functions
export const emergencyUtils = {
  // Get current location
  getCurrentLocation: (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location: LocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            address: 'Loading address...', // Would use reverse geocoding in real app
            timestamp: Date.now(),
          };

          // Try to get address using reverse geocoding (mock for now)
          try {
            location.address = await emergencyUtils.reverseGeocode(
              location.latitude,
              location.longitude
            );
          } catch (error) {
            console.warn('Failed to get address:', error);
            location.address = `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
          }

          resolve(location);
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    });
  },

  // Reverse geocoding (mock implementation)
  reverseGeocode: async (lat: number, lng: number): Promise<string> => {
    // In a real app, you would use Google Maps Geocoding API or similar
    // For now, return a mock address
    return `Location near ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  },

  // Format phone number
  formatPhoneNumber: (phone: string): string => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Check if it's an Indian number
    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    } else if (cleaned.length === 13 && cleaned.startsWith('91')) {
      return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
    }
    
    return phone;
  },

  // Validate phone number
  isValidPhoneNumber: (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10 || (cleaned.length === 13 && cleaned.startsWith('91'));
  },

  // Get emergency number by type
  getEmergencyNumber: (type: string): string => {
    const numbers: Record<string, string> = {
      general: '112',
      police: '100',
      fire: '101',
      medical: '102',
      disaster: '108',
    };
    return numbers[type] || '112';
  },

  // Check if location services are available
  isLocationAvailable: (): boolean => {
    return 'geolocation' in navigator;
  },

  // Get battery level (if supported)
  getBatteryLevel: async (): Promise<number> => {
    try {
      // @ts-ignore - Battery API is experimental
      if ('getBattery' in navigator) {
        // @ts-ignore
        const battery = await navigator.getBattery();
        return Math.round(battery.level * 100);
      }
    } catch (error) {
      console.warn('Battery API not supported:', error);
    }
    return 85; // Default value
  },
};