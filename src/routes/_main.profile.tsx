import { createFileRoute } from '@tanstack/react-router'
import { profileQueryOptions } from '@core/queries'
import { ProfilePage } from '@features/profile/page'

export const Route = createFileRoute('/_main/profile')({
  loader: ({ context }) => context.queryClient.ensureQueryData(profileQueryOptions),
  component: ProfilePage,
})
