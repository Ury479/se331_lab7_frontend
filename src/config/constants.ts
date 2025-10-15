// Application-wide constants and configuration

/**
 * LocalStorage keys for token management
 */
export const TOKEN_KEYS = {
  ACCESS: 'accessToken',
  REFRESH: 'refreshToken',
} as const

/**
 * API configuration
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_BACKEND_URL ||
            import.meta.env.VITE_API_BASE_URL ||
            'http://localhost:8080',
  TIMEOUT: 15000, // 15 seconds
  RETRY_DELAY: 1000, // 1 second
} as const

/**
 * Authentication endpoints
 */
export const AUTH_PATHS = {
  LOGIN: import.meta.env.VITE_AUTH_LOGIN_PATH || '/api/v1/auth/authenticate',
  REFRESH: import.meta.env.VITE_AUTH_REFRESH_PATH || '/api/v1/auth/refresh-token',
  REGISTER: import.meta.env.VITE_AUTH_REGISTER_PATH || '/api/v1/auth/register',
  LOGOUT: import.meta.env.VITE_AUTH_LOGOUT_PATH || '/api/v1/auth/logout',
} as const

/**
 * Route names
 */
export const ROUTE_NAMES = {
  LOGIN: 'login',
  LOGIN_DEMO: 'login-demo',
  EVENT_LIST: 'event-list-view',
  ORGANIZER_LIST: 'organizer-list-view',
} as const

/**
 * Pagination defaults
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [2, 3, 5, 10, 20, 50],
} as const

/**
 * UI timing constants (in milliseconds)
 */
export const UI_TIMING = {
  REDIRECT_DELAY: 2000,
  TOAST_DURATION: 3000,
  DEBOUNCE_DELAY: 300,
} as const

/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络连接失败，请检查您的网络连接',
  UNAUTHORIZED: '用户名或密码错误',
  RATE_LIMIT: '请求过于频繁，请稍后再试',
  SERVER_ERROR: '服务器错误，请稍后再试',
  UNKNOWN_ERROR: '发生未知错误，请重试',
  TOKEN_REFRESH_FAILED: '登录已过期，请重新登录',
} as const

