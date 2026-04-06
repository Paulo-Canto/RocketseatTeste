import { useQuery } from '@tanstack/react-query'
import { Loading } from '@ui/loading'
import { dashboardSummaryQueryOptions } from '@core/queries'

export function DashboardPage() {
  const q = useQuery(dashboardSummaryQueryOptions)

  if (q.isPending) {
    return <Loading />
  }
  if (q.isError) {
    return <p className="text-sm text-red-600">Failed to load summary.</p>
  }

  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <ul className="grid gap-2 sm:grid-cols-2">
        {q.data.widgets.map((w) => (
          <li key={w.id} className="rounded-lg border border-zinc-200 bg-white p-4">
            <div className="text-sm text-zinc-500">{w.id}</div>
            <div className="text-2xl font-semibold">{w.value}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
