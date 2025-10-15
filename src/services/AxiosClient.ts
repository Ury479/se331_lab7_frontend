// A single Axios client used across the app.
// It injects Authorization header automatically and refreshes token on 401.
//
// Env usage:
// - VITE_BACKEND_URL or VITE_API_BASE_URL for server base URL
// - Auth endpoints can be overridden by env as well.

import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosError,
    type InternalAxiosRequestConfig,
} from 'axios'

const baseURL =
    import.meta.env.VITE_BACKEND_URL ??
    import.meta.env.VITE_API_BASE_URL ??
    'http://localhost:8080'

// ---- Helpers to access tokens (localStorage for simplicity) ----
function getAccessToken(): string | null {
    // Prefer snake_case per backend contract, fallback to old camelCase
    return (
        localStorage.getItem('access_token') ?? localStorage.getItem('accessToken')
    )
}
function setAccessToken(token: string) {
    // Persist in both keys for backward compatibility
    localStorage.setItem('access_token', token)
    localStorage.setItem('accessToken', token)
}
function getRefreshToken(): string | null {
    return (
        localStorage.getItem('refresh_token') ?? localStorage.getItem('refreshToken')
    )
}
// ---- Auth paths (can be overridden via env) ----
const AUTH_REFRESH_PATH =
    import.meta.env.VITE_AUTH_REFRESH_PATH ?? '/api/v1/auth/refresh-token'

// ---- Create axios instance ----
const apiClient: AxiosInstance = axios.create({
    baseURL,
    timeout: 15000, // 15 seconds timeout
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

// ---- Request interceptor: add Bearer token if present ----
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getAccessToken()
    if (token) {
        config.headers = config.headers ?? {}
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// ---- Response interceptor: auto refresh on 401 and retry once ----
let isRefreshing = false
let pendingQueue: Array<(token: string | null) => void> = []

async function refreshAccessToken(): Promise<string | null> {
    const refreshToken = getRefreshToken()
    if (!refreshToken) return null

    // call refresh endpoint using a bare axios (avoid recursion)
    const resp = await axios.post(
        new URL(AUTH_REFRESH_PATH, baseURL).toString(),
        {},
        {
            headers: { Authorization: `Bearer ${refreshToken}` },
        }
    )
    const newAccess = resp.data?.accessToken ?? resp.data?.access_token
    if (newAccess) {
        setAccessToken(newAccess)
        return newAccess
    }
    return null
}

apiClient.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        const original = error.config as AxiosRequestConfig & { _retried?: boolean }

        // If unauthorized and not retried yet, try refresh flow
        if (error.response?.status === 401 && !original?._retried) {
            if (!isRefreshing) {
                // start refresh
                isRefreshing = true
                try {
                    const newToken = await refreshAccessToken()
                    // flush the queue
                    pendingQueue.forEach((cb) => cb(newToken))
                    pendingQueue = []
                    return retryWithNewToken(apiClient, original, newToken)
                } catch (e) {
                    // refresh failed -> flush with null
                    pendingQueue.forEach((cb) => cb(null))
                    pendingQueue = []
                    throw e
                } finally {
                    isRefreshing = false
                }
            } else {
                // queue this request until refresh finishes
                return new Promise((resolve, reject) => {
                    pendingQueue.push((newToken) => {
                        retryWithNewToken(apiClient, original, newToken).then(resolve).catch(reject)
                    })
                })
            }
        }
        return Promise.reject(error)
    }
)

function retryWithNewToken(
    client: AxiosInstance,
    original: AxiosRequestConfig & { _retried?: boolean },
    token: string | null
) {
    if (!token) {
        // optional: redirect to /login or clear storage
        // localStorage.removeItem('accessToken'); localStorage.removeItem('refreshToken');
        return Promise.reject(new Error('Unable to refresh access token'))
    }
    original.headers = original.headers ?? {}
    ;(original.headers as Record<string, string>).Authorization = `Bearer ${token}`
    original._retried = true
    return client.request(original)
}

export default apiClient
