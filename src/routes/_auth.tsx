import { Outlet, createFileRoute } from '@tanstack/react-router'
import { AuthLayout } from '@layouts/auth-layout'

export const Route = createFileRoute('/_auth')({
  component: AuthGroupLayout,
})

function AuthGroupLayout() {
  return (
    <AuthLayout appVersion={import.meta.env.VITE_APP_VERSION}>
      <Outlet />
    </AuthLayout>
  )
}
