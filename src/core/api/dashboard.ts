import { defineApiRoute, httpResource } from '@core/http-resource'

export type DashboardSummary = {
  widgets: Array<{ id: string; value: number }>
}

const routes = {
  summary: defineApiRoute('/dashboard/summary'),
} as const

const http = httpResource()

export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  return http.get<DashboardSummary>(routes.summary)
}
