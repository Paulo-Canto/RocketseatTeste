import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { dashboardSummaryQueryOptions } from '@core/queries'
import { getSessionSnapshot } from '@core/session-store'
import { MainLayout } from '@layouts/main-layout'

export const Route = createFileRoute('/_main')({
  beforeLoad: async ({ context }) => {
    const { accessToken, user } = getSessionSnapshot()
    if (!accessToken || !user) {
      throw redirect({ to: '/login' })
    }
    await context.queryClient.prefetchQuery(dashboardSummaryQueryOptions)
  },
  component: MainGroupLayout,
})

function MainGroupLayout() {
  return (
    <MainLayout appVersion={import.meta.env.VITE_APP_VERSION}>
      <Outlet />
    </MainLayout>
  )
}
