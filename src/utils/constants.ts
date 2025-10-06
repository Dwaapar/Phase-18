export const APP_CONFIG = {
  name: 'Findawise',
  description: 'The wisdom layer for execution',
  version: '2.4.0',
  author: 'Findawise Team',
  contact: {
    email: 'hello@findawise.com',
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA'
  },
  social: {
    twitter: 'https://twitter.com/findawise',
    linkedin: 'https://linkedin.com/company/findawise',
    youtube: 'https://youtube.com/@findawise',
    github: 'https://github.com/findawise'
  }
};

export const API_ENDPOINTS = {
  base: process.env.REACT_APP_API_URL || 'https://api.findawise.com',
  auth: '/auth',
  workflows: '/workflows',
  agents: '/agents',
  assets: '/assets',
  users: '/users',
  analytics: '/analytics'
};

export const STORAGE_KEYS = {
  authToken: 'findawise_auth_token',
  userPreferences: 'findawise_user_preferences',
  theme: 'findawise_theme',
  language: 'findawise_language'
};

export const PAGINATION = {
  defaultPageSize: 20,
  pageSizeOptions: [10, 20, 50, 100]
};

export const FILE_UPLOAD = {
  maxSize: 10, // MB
  allowedTypes: {
    images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    data: ['text/csv', 'application/json', 'application/vnd.ms-excel']
  }
};

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

export const COLORS = {
  primary: '#0F62FE',
  secondary: '#525252',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6'
};