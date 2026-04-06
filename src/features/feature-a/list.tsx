import { EmptyState } from '@features/feature-a/empty-state'
import { useFeatureAList } from '@features/feature-a/hooks'

export function FeatureAList() {
  const q = useFeatureAList()

  if (q.isPending) {
    return <p className="text-sm">Loading…</p>
  }
  if (q.isError) {
    return <p className="text-sm text-red-600">Error</p>
  }
  if (q.data.items.length === 0) {
    return <EmptyState />
  }

  return (
    <ul className="space-y-2">
      {q.data.items.map((item) => (
        <li key={item.id} className="rounded border border-zinc-200 bg-white p-3 text-sm">
          {item.title}
        </li>
      ))}
    </ul>
  )
}
