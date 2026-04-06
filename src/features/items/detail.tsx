import { useQuery } from '@tanstack/react-query'
import { itemDetailQueryOptions } from '@core/queries'

export type ItemDetailProps = {
  itemId: string
}

export function ItemDetail({ itemId }: ItemDetailProps) {
  const q = useQuery(itemDetailQueryOptions(itemId))

  if (q.isPending) {
    return <p className="text-sm">Loading…</p>
  }
  if (q.isError || !q.data) {
    return <p className="text-sm text-red-600">Item not found.</p>
  }

  return (
    <div className="space-y-2">
      <h1 className="text-xl font-semibold">{q.data.title}</h1>
      <p className="text-sm text-zinc-500">Updated {q.data.updatedAt}</p>
    </div>
  )
}
