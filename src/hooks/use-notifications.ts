import { useState, useEffect, useCallback } from 'react';
import type { Notification, NotificationSettings } from '@/types/notification';

// Mock data for demonstration
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'High Wave Alert – Odisha Coast',
    message: 'Strong wave activity detected. Fishermen advised to avoid deep sea fishing.',
    type: 'emergency',
    priority: 'critical',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    isRead: false,
    location: 'Odisha Coast',
    category: 'weather',
    actionUrl: '/dashboard/view-details',
    actionText: 'View Details',
  },
  {
    id: '2',
    title: 'Community Safety Update',
    message: 'Local evacuation center at Main Street School has been opened for people affected by the recent flooding.',
    type: 'info',
    priority: 'high',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false,
    location: 'Main Street, Kolkata',
    category: 'safety',
  },
  {
    id: '3',
    title: 'Flood Alert - Krishna River',
    message: 'Water levels rising rapidly. Residents in low-lying areas should prepare for evacuation.',
    type: 'alert',
    priority: 'critical',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    isRead: false,
    location: 'Krishna Basin',
    category: 'weather',
  },
  {
    id: '4',
    title: 'Weather Warning Lifted',
    message: 'The cyclone warning for your area has been lifted. Normal activities can resume.',
    type: 'success',
    priority: 'medium',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    isRead: true,
    location: 'West Bengal',
    category: 'weather',
  },
  {
    id: '5',
    title: 'Emergency Contact Update',
    message: 'Your emergency contact John Doe has been successfully updated.',
    type: 'success',
    priority: 'low',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    isRead: true,
    category: 'system',
  },
  {
    id: '6',
    title: 'Community Post: Road Blockage',
    message: 'MG Road is blocked due to fallen tree. Alternative routes available via Park Street.',
    type: 'warning',
    priority: 'medium',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    isRead: true,
    location: 'MG Road, Kolkata',
    category: 'community',
  },
  {
    id: '7',
    title: 'Profile Update Required',
    message: 'Please update your emergency contact information for better assistance during emergencies.',
    type: 'info',
    priority: 'low',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true,
    category: 'system',
    actionUrl: '/profile',
    actionText: 'Update Profile',
  },
  {
    id: '8',
    title: 'Rescue Operation Complete',
    message: 'All 15 people stranded in the flood-affected area have been successfully rescued.',
    type: 'success',
    priority: 'high',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    isRead: true,
    location: 'Sundarbans',
    category: 'safety',
  },
];

const defaultSettings: NotificationSettings = {
  enabled: true,
  pushNotifications: true,
  soundEnabled: true,
  vibrationEnabled: true,
  categories: {
    weather: true,
    safety: true,
    community: true,
    system: true,
    emergency: true,
  },
  quietHours: {
    enabled: false,
    startTime: '22:00',
    endTime: '08:00',
  },
};

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);

  // Get unread count
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Mark notification as read
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, []);

  // Mark notification as unread
  const markAsUnread = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: false }
          : notification
      )
    );
  }, []);

  // Delete notification
  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  }, []);

  // Clear all notifications
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Add new notification
  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: new Date(),
      isRead: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Play notification sound if enabled
    if (settings.soundEnabled && settings.enabled) {
      // You can implement sound notification here
      console.log('🔔 New notification sound');
    }
    
    return newNotification;
  }, [settings.soundEnabled, settings.enabled]);

  // Update settings
  const updateSettings = useCallback((newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Filter notifications by category
  const getNotificationsByCategory = useCallback((category: Notification['category']) => {
    return notifications.filter(n => n.category === category);
  }, [notifications]);

  // Get notifications by priority
  const getNotificationsByPriority = useCallback((priority: Notification['priority']) => {
    return notifications.filter(n => n.priority === priority);
  }, [notifications]);

  // Simulate fetching notifications from API
  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real app, this would fetch from your API
      // const response = await fetch('/api/notifications');
      // const data = await response.json();
      // setNotifications(data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-fetch notifications periodically (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      // You could implement auto-refresh here
      // fetchNotifications();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    notifications,
    settings,
    unreadCount,
    isLoading,
    markAsRead,
    markAsUnread,
    deleteNotification,
    markAllAsRead,
    clearAll,
    addNotification,
    updateSettings,
    getNotificationsByCategory,
    getNotificationsByPriority,
    fetchNotifications,
  };
}