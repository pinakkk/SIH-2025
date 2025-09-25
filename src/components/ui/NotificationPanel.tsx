import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import {
  Bell,
  X,
  AlertTriangle,
  Info,
  CheckCircle,
  AlertCircle,
  MapPin,
  Settings,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";
import { Icon } from "@iconify/react";
import type { Notification, NotificationAction } from "@/types/notification";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAsUnread: (id: string) => void;
  onDelete: (id: string) => void;
  onClearAll?: () => void;
  onMarkAllAsRead?: () => void;
  onAction?: (notification: Notification, action: NotificationAction) => void;
  unreadCount?: number;
}

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onMarkAsUnread: (id: string) => void;
  onDelete: (id: string) => void;
  onAction?: (notification: Notification, action: NotificationAction) => void;
}

const getNotificationIcon = (type: Notification['type'], category?: Notification['category']) => {
  switch (type) {
    case 'emergency':
      return <AlertTriangle className="text-red-400" size={20} />;
    case 'alert':
      return <AlertCircle className="text-orange-400" size={20} />;
    case 'warning':
      return <AlertTriangle className="text-yellow-400" size={20} />;
    case 'success':
      return <CheckCircle className="text-green-400" size={20} />;
    case 'info':
    default:
      if (category === 'weather') {
        return <Icon icon="mdi:weather-cloudy" className="text-blue-400 text-xl" />;
      }
      if (category === 'safety') {
        return <Icon icon="mdi:shield-alert" className="text-orange-400 text-xl" />;
      }
      if (category === 'community') {
        return <Icon icon="mdi:account-group" className="text-purple-400 text-xl" />;
      }
      return <Info className="text-blue-400" size={20} />;
  }
};

const getPriorityColor = (priority: Notification['priority']) => {
  switch (priority) {
    case 'critical':
      return 'border-l-red-500 bg-red-500/5';
    case 'high':
      return 'border-l-orange-500 bg-orange-500/5';
    case 'medium':
      return 'border-l-yellow-500 bg-yellow-500/5';
    case 'low':
    default:
      return 'border-l-blue-500 bg-blue-500/5';
  }
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
};

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Handle delete with animation
  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(notification.id);
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3 }}
      layout
      className={isDeleting ? "opacity-50" : ""}
    >
      <div className={`bg-gradient-to-r from-[#2a1e1c] to-[#1e1614] border border-[#3a2f2d] rounded-xl ${getPriorityColor(notification.priority)} border-l-4 hover:bg-[#2c211f] transition-colors`}>
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              {getNotificationIcon(notification.type, notification.category)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className={`font-medium text-sm leading-relaxed ${
                      notification.isRead ? 'text-[#bfb2ac]' : 'text-white'
                    }`}>
                      {notification.title}
                    </h3>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 animate-pulse" />
                    )}
                  </div>
                  
                  <p className="text-sm text-[#d8cdc6] leading-relaxed line-clamp-3 mb-4">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between gap-2">
                    {notification.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={12} className="text-[#9d9188]" />
                        <span className="text-sm text-[#9d9188] truncate max-w-[140px]">{notification.location}</span>
                      </div>
                    )}
                    
                    <span className="text-sm text-[#9d9188] whitespace-nowrap ml-auto">
                      {formatTimeAgo(notification.timestamp)}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowActions(!showActions)}
                  className="text-[#9d9188] hover:text-white transition-colors p-2 flex-shrink-0 rounded-lg hover:bg-[#3a3330]"
                >
                  <Icon icon="mdi:dots-horizontal" width={16} height={16} />
                </button>
              </div>
              

            </div>
          </div>
          
          {/* Actions Menu */}
          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-[#3a2f2d] flex gap-3"
              >
                <button
                  onClick={() => notification.isRead ? onMarkAsUnread(notification.id) : onMarkAsRead(notification.id)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-[#bfb2ac] hover:text-white bg-[#2a2a2a] hover:bg-[#3a3330] rounded-lg transition-colors"
                >
                  {notification.isRead ? <EyeOff size={12} /> : <Eye size={12} />}
                  {notification.isRead ? 'Mark Unread' : 'Mark Read'}
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 bg-[#2a2a2a] hover:bg-[#3a3330] rounded-lg transition-colors disabled:opacity-50"
                >
                  <Trash2 size={12} className={isDeleting ? "animate-spin" : ""} />
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
  onClearAll,
  onMarkAllAsRead,
  unreadCount = 0,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isClearingAll, setIsClearingAll] = useState(false);
  
  // Handle clearing all notifications with animation
  const handleClearAll = () => {
    if (!notifications.length || !onClearAll) return;
    
    setIsClearingAll(true);
    setTimeout(() => {
      onClearAll();
      setIsClearingAll(false);
    }, 300);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.priority !== b.priority) {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  const unreadNotifications = sortedNotifications.filter(n => !n.isRead);
  const readNotifications = sortedNotifications.filter(n => n.isRead);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
          />
          
          {/* Panel */}
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm sm:max-w-md bg-gradient-to-b from-[#2b2320] to-[#1f1816] border-l border-[#3a2f2d] z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-gradient-to-r from-[#2b2320]/95 to-[#1f1816]/95 backdrop-blur-sm border-b border-[#3a2f2d] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  <Bell size={20} className="text-orange-400" />
                  <h2 className="font-semibold text-lg sm:text-xl text-white">Notifications</h2>
                  {unreadCount > 0 && (
                    <span className="bg-orange-500 text-white text-sm font-medium px-2.5 py-1 rounded-full min-w-[24px] text-center">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {notifications.length > 0 && (
                    <motion.button
                      onClick={handleClearAll}
                      className="flex items-center gap-1 px-2.5 py-1.5 text-sm text-[#bfb2ac] hover:text-white bg-[#3a2f2d] hover:bg-[#4a3e3c] rounded-lg transition-colors"
                      whileTap={{ scale: 0.95 }}
                      disabled={isClearingAll}
                      title="Clear all notifications"
                    >
                      <Trash2 size={14} className={isClearingAll ? "animate-spin" : ""} />
                      {isClearingAll ? "Clearing..." : "Clear All"}
                    </motion.button>
                  )}
                  <button
                    onClick={onClose}
                    className="p-2.5 text-[#bfb2ac] hover:text-white hover:bg-[#3a3330] rounded-xl transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-4">
                {notifications.length === 0 ? (
                  <motion.div 
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-12 sm:py-16"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#3a2f2d] rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                      <Bell size={24} className="text-[#9d9188] sm:w-7 sm:h-7" />
                    </div>
                    <h3 className="font-medium text-white mb-3 text-base sm:text-lg">No notifications</h3>
                    <p className="text-[#bfb2ac] text-sm sm:text-base max-w-xs mx-auto leading-relaxed">
                      You're all caught up! New notifications will appear here.
                    </p>
                  </motion.div>
                ) : (
                <motion.div 
                  key="notifications-list"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6">
                  {/* Unread Notifications */}
                  {unreadNotifications.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-white text-sm sm:text-base mb-4 flex items-center gap-3 sticky top-0 bg-gradient-to-r from-[#2b2320] to-[#1f1816] py-2 z-10">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                        New ({unreadNotifications.length})
                        {unreadNotifications.length > 0 && onMarkAllAsRead && (
                          <button 
                            onClick={onMarkAllAsRead}
                            className="ml-auto text-xs text-orange-400 hover:text-orange-300 transition-colors"
                          >
                            Mark all as read
                          </button>
                        )}
                      </h3>
                      <div className="space-y-4">
                        <AnimatePresence initial={false}>
                          {unreadNotifications.map(notification => (
                            <NotificationItem
                              key={notification.id}
                              notification={notification}
                              onMarkAsRead={onMarkAsRead}
                              onMarkAsUnread={onMarkAsUnread}
                              onDelete={onDelete}
                            />
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                  {/* Read Notifications */}
                  {readNotifications.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-[#bfb2ac] text-sm sm:text-base mb-4 sticky top-0 bg-gradient-to-r from-[#2b2320] to-[#1f1816] py-2 z-10">
                        Earlier
                      </h3>
                      <div className="space-y-4">
                        <AnimatePresence initial={false}>
                          {readNotifications.map(notification => (
                            <NotificationItem
                              key={notification.id}
                              notification={notification}
                              onMarkAsRead={onMarkAsRead}
                              onMarkAsUnread={onMarkAsUnread}
                              onDelete={onDelete}
                            />
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

// Notification Button Component
interface NotificationButtonProps {
  unreadCount: number;
  onClick: () => void;
  className?: string;
}

export const NotificationButton: React.FC<NotificationButtonProps> = ({
  unreadCount,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#372a28] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform ${className}`}
    >
      <Bell size={16} className="text-white sm:w-[18px] sm:h-[18px]" />
      {unreadCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-orange-500 text-white text-xs font-medium rounded-full flex items-center justify-center ring-1 sm:ring-2 ring-[#372a28]"
        >
          {unreadCount > 99 ? '99+' : unreadCount > 9 ? '9+' : unreadCount}
        </motion.span>
      )}
    </button>
  );
};