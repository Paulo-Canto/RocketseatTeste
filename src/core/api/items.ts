import { defineApiRoute, defineApiRouteFn, httpResource } from '@core/http-resource'

export type ItemRecord = {
  id: string
  title: string
  updatedAt: string
}

export type ItemListResponse = {
  items: ItemRecord[]
  total: number
}

const routes = {
  list: defineApiRoute('/items'),
  detail: defineApiRouteFn((id: string) => `/items/${id}` as const),
} as const

const http = httpResource()

export async function fetchItems(params: { page: number; q?: string }): Promise<ItemListResponse> {
  const search = new URLSearchParams()
  search.set('page', String(params.page))
  if (params.q) search.set('q', params.q)
  return http.get<ItemListResponse>(`${routes.list}?${search.toString()}`)
}

export async function fetchItemById(id: string): Promise<ItemRecord> {
  return http.get<ItemRecord>(routes.detail(id))
}
