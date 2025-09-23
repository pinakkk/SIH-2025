export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user_data',
  THEME: 'theme_preference',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  LIVE_HAZARD_MAP: "/dashboard/live-hazard-map",
  CREATE_POST: "/create-post", // ✅ NEW
  COMMUNITY: "/community", // New
  PROFILE: '/dashboard/profile',
  SETTINGS: '/dashboard/settings',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFICATION: '/verification',
  NEW_PASSWORD: '/new-password',
  SUCCESS: '/success',
  CONTACT_US: '/contact-us',
  FEEDBACK: '/feedback',
  EMERGENCY_MODE: '/dashboard/emergency-mode',
  EMERGENCY_CALLING: '/dashboard/emergency-calling',
  EMERGENCY_CONTACTS: '/dashboard/emergency-contacts',
  LIVE_LOCATION: '/dashboard/live-location',
  EMERGENCY_SETTINGS: '/dashboard/emergency-settings',
} as const;


export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;