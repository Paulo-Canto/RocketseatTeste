import { defineApiRoute, httpResource } from '@core/http-resource'

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
  user: { id: string; label: string }
}

export type RefreshRequest = {
  refreshToken: string
}

export type RefreshResponse = {
  accessToken: string
  refreshToken: string
}

const routes = {
  login: defineApiRoute('/session/login'),
  refresh: defineApiRoute('/session/refresh'),
  logout: defineApiRoute('/session/logout'),
} as const

const http = httpResource()

export async function login(body: LoginRequest): Promise<LoginResponse> {
  return http.post<LoginResponse>(routes.login, body)
}

export async function refreshSession(body: RefreshRequest): Promise<RefreshResponse> {
  return http.post<RefreshResponse>(routes.refresh, body)
}

export async function logout(): Promise<void> {
  await http.post<void>(routes.logout, {})
}
