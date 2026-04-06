import { defineApiRoute, httpResource } from '@core/http-resource'

export type ProfileResponse = {
  id: string
  displayName: string
  email: string
}

const routes = {
  me: defineApiRoute('/profile/me'),
} as const

const http = httpResource()

export async function fetchProfile(): Promise<ProfileResponse> {
  return http.get<ProfileResponse>(routes.me)
}
