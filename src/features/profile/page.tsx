import { useQuery } from '@tanstack/react-query'
import { Loading } from '@ui/loading'
import { profileQueryOptions } from '@core/queries'

export function ProfilePage() {
  const q = useQuery(profileQueryOptions)

  if (q.isPending) {
    return <Loading />
  }
  if (q.isError || !q.data) {
    return <p className="text-sm text-red-600">Profile unavailable.</p>
  }

  return (
    <div className="space-y-2">
      <h1 className="text-xl font-semibold">Profile</h1>
      <p className="text-sm text-zinc-600">{q.data.displayName}</p>
      <p className="text-sm text-zinc-500">{q.data.email}</p>
    </div>
  )
}
