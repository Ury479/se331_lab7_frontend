// Auth API wrapper
import http from './http';

export interface AuthRequest {
  username: string;
  password: string;
}
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export async function login(data: AuthRequest) {
  const res = await http.post<AuthResponse>('/api/v1/auth/authenticate', data);
  return res.data;
}
