import { queryOptions } from '@tanstack/react-query'
import { fetchDashboardSummary } from '@core/api/dashboard'
import { fetchItemById, fetchItems } from '@core/api/items'
import { fetchProfile } from '@core/api/profile'
import { itemsKeys, profileKeys, dashboardKeys } from '@core/keys'
import { getSessionSnapshot } from '@core/session-store'

export const profileQueryOptions = queryOptions({
  queryKey: profileKeys.me.queryKey,
  queryFn: () => fetchProfile(),
  staleTime: 60_000,
})

export const dashboardSummaryQueryOptions = queryOptions({
  queryKey: dashboardKeys.summary.queryKey,
  queryFn: () => fetchDashboardSummary(),
  staleTime: 15_000,
})

export function itemsListQueryOptions(filters: { page: number; q?: string }) {
  return queryOptions({
    queryKey: itemsKeys.list(filters).queryKey,
    queryFn: () => fetchItems(filters),
    placeholderData: (prev) => prev,
    staleTime: 20_000,
  })
}

export function itemDetailQueryOptions(id: string) {
  return queryOptions({
    queryKey: itemsKeys.detail(id).queryKey,
    queryFn: () => fetchItemById(id),
    enabled: id.length > 0,
  })
}

export const sessionGateQueryOptions = queryOptions({
  queryKey: ['session', 'gate'] as const,
  queryFn: async () => {
    const s = getSessionSnapshot()
    return { ok: Boolean(s.accessToken && s.user) }
  },
  staleTime: Infinity,
})
