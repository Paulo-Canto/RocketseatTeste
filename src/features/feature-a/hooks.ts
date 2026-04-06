import { useQuery } from '@tanstack/react-query'
import { queryOptions } from '@tanstack/react-query'
import { itemsKeys } from '@core/keys'
import { fetchItems } from '@core/api/items'

export function useFeatureAList() {
  return useQuery(
    queryOptions({
      queryKey: itemsKeys.list({ page: 1 }).queryKey,
      queryFn: () => fetchItems({ page: 1 }),
    }),
  )
}
