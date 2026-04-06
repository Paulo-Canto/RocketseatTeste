import { useQuery } from '@tanstack/react-query'
import { itemsListQueryOptions } from '@core/queries'

export function useItemsList(filters: { page: number; q?: string }) {
  return useQuery(itemsListQueryOptions(filters))
}
