// Auth API wrapper - Simple functions that use the auth store
// This file is kept for backward compatibility and simple function-based API calls
import http from './http'

export interface AuthRequest {
  username: string
  password: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
}

/**
 * Login function - Direct API call without store
 * For most use cases, prefer using useAuthStore().login() instead
 */
export async function login(data: AuthRequest): Promise<AuthResponse> {
  const res = await http.post<AuthResponse>('/api/v1/auth/authenticate', data)
  return res.data
}

/**
 * Logout function - Direct API call
 */
export async function logout(): Promise<void> {
  // If your backend has a logout endpoint, call it here
  // await http.post('/api/v1/auth/logout')

  // Clear tokens from localStorage
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}
