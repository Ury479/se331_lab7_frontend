// Auth store using Pinia + Axios (TypeScript)
import { defineStore } from 'pinia'
import axios, { type AxiosInstance } from 'axios'
import type { Organizer } from '@/types/Organizer'

/** Create a dedicated axios client for auth-related calls */
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user?: Organizer
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    /** hold access token (null when logged out) */
    token: null as string | null,
    /** optional: keep refresh token if you plan to auto-refresh */
    refreshToken: null as string | null,
    /** user information */
    user: null as Organizer | null,
    /** simple loading/error flags */
    loading: false,
    error: '' as string | '',
  }),
  getters: {
    /** Check if user is authenticated */
    isAuthenticated: (state) => !!state.token,
    /** Get current user name */
    currentUserName(): string {
      return this.user?.name || ''
    },
    /** Authorization header value e.g. `Bearer <token>` */
    authorizationHeader(): string {
      return this.token ? `Bearer ${this.token}` : ''
    },
  },
  actions: {
    /** Sign in with username + password against backend */
    async login(username: string, password: string) {
      this.loading = true
      this.error = ''
      try {
        const res = await apiClient.post<AuthResponse>('/api/v1/auth/authenticate', {
          username,
          password,
        })
        // save tokens in store
        this.token = res.data.accessToken
        this.refreshToken = res.data.refreshToken
        this.user = res.data.user || null

        // persist to localStorage so refresh survives reload
        localStorage.setItem('accessToken', this.token)
        localStorage.setItem('refreshToken', this.refreshToken!)

        // store user information
        if (this.user) {
          localStorage.setItem('user', JSON.stringify(this.user))
        }

        return res.data
      } catch (err: any) {
        // map backend message to UI-friendly error text
        this.error = err?.response?.data?.message ?? 'Login failed'
        throw err
      } finally {
        this.loading = false
      }
    },

    /** Simple logout: clear state + storage */
    logout() {
      console.log('logout')
      this.token = null
      this.refreshToken = null
      this.user = null
      this.error = ''
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
    },

    /** Initialize auth state from localStorage on app start */
    initialize() {
      const token = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      const userStr = localStorage.getItem('user')

      if (token) {
        this.token = token
        this.refreshToken = refreshToken
      }

      if (userStr) {
        try {
          this.user = JSON.parse(userStr) as Organizer
        } catch (error) {
          console.error('Failed to parse user from localStorage:', error)
          localStorage.removeItem('user')
        }
      }
    },
  },
})

