import { createFileRoute } from '@tanstack/react-router'
import { FeatureAList } from '@features/feature-a/list'
import { FeatureBDialogTrigger } from '@features/feature-b/dialog'
import { ItemsList } from '@features/items/list'

export type ItemsSearch = {
  page: number
  q?: string
}

export const Route = createFileRoute('/_main/items/')({
  validateSearch: (raw: Record<string, unknown>): ItemsSearch => {
    const page = Math.max(1, Number(raw.page ?? 1) || 1)
    const q = typeof raw.q === 'string' && raw.q.length > 0 ? raw.q : undefined
    return { page, q }
  },
  component: ItemsIndexRoute,
})

function ItemsIndexRoute() {
  const search = Route.useSearch()
  return (
    <div className="space-y-6">
      <ItemsList page={search.page} q={search.q} />
      <section className="space-y-2">
        <h2 className="text-sm font-medium text-zinc-700">Feature A</h2>
        <FeatureAList />
      </section>
      <FeatureBDialogTrigger />
    </div>
  )
}
