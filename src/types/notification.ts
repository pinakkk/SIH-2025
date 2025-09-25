export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'info' | 'warning' | 'success' | 'emergency';
  timestamp: Date;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  location?: string;
  actionUrl?: string;
  actionText?: string;
  icon?: string;
  sourceId?: string;
  category?: 'weather' | 'safety' | 'community' | 'system' | 'emergency';
  expiresAt?: Date;
  metadata?: Record<string, any>;
}

export interface NotificationSettings {
  enabled: boolean;
  pushNotifications: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  categories: {
    weather: boolean;
    safety: boolean;
    community: boolean;
    system: boolean;
    emergency: boolean;
  };
  quietHours: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  };
}

export interface NotificationAction {
  id: string;
  label: string;
  action: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}