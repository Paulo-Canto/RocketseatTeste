import { createFileRoute, redirect } from '@tanstack/react-router'
import { getSessionSnapshot } from '@core/session-store'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const { accessToken, user } = getSessionSnapshot()
    if (accessToken && user) {
      throw redirect({ to: '/dashboard' })
    }
    throw redirect({ to: '/login' })
  },
})
