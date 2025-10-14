/// <reference types="vite/client" />

// Allow importing .vue SFCs in TypeScript
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, never>
  export default component
}

// Strong typing for Vite environment variables (only variables prefixed with VITE_ are exposed)
interface ImportMetaEnv {
  /** Base API endpoint for axios, e.g. http://localhost:8080 */
  readonly VITE_API_BASE_URL?: string

  /** Backend URL (if you use a dedicated variable for backend) */
  readonly VITE_BACKEND_URL?: string

  /** Toggle using mock data: 'true' | 'false' */
  readonly VITE_ENABLE_MOCK?: 'true' | 'false'

  /** Use HTTPS in dev: 'true' | 'false' */
  readonly VITE_USE_HTTPS?: 'true' | 'false'

  /** Application branding name shown in UI */
  readonly VITE_APP_NAME?: string

  /** App version (display in footer/about) */
  readonly VITE_APP_VERSION?: string

  /** Google Analytics ID (if any), e.g. G-XXXXXXX */
  readonly VITE_GA_ID?: string

  /** Sentry DSN (if any) */
  readonly VITE_SENTRY_DSN?: string

  /** Default page size for pagination, e.g. "10" */
  readonly VITE_DEFAULT_PAGE_SIZE?: string

  /** Axios/global request timeout in milliseconds, e.g. "15000" */
  readonly VITE_TIMEOUT_MS?: string

  /** CORS allowed origin to show in UI/config panels (optional) */
  readonly VITE_CORS_ORIGIN?: string

  /** Auth endpoints (optional: override defaults) */
  readonly VITE_AUTH_LOGIN_PATH?: string        // default: /api/v1/auth/authenticate
  readonly VITE_AUTH_REFRESH_PATH?: string      // default: /api/v1/auth/refresh-token
  readonly VITE_AUTH_REGISTER_PATH?: string     // default: /api/v1/auth/register
  readonly VITE_AUTH_LOGOUT_PATH?: string       // default: /api/v1/auth/logout
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
