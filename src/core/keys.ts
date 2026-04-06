import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'

export const sessionKeys = createQueryKeys('session', {
  current: null,
})

export const itemsKeys = createQueryKeys('items', {
  all: null,
  list: (filters: { page: number; q?: string }) => [filters],
  detail: (id: string) => [id],
})

export const profileKeys = createQueryKeys('profile', {
  me: null,
})

export const dashboardKeys = createQueryKeys('dashboard', {
  summary: null,
})

export const queryKeyRegistry = mergeQueryKeys(sessionKeys, itemsKeys, profileKeys, dashboardKeys)
