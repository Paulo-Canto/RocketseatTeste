import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet, createRootRouteWithContext, HeadContent } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AuthProvider } from '@core/auth-provider'
import { ConsentProvider } from '@core/cookies/consent-provider'
import { Toaster } from '@ui/toaster'
import { NotFoundPage } from '@layouts/pages/not-found-page'

export type RouterContext = {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
})

function RootLayout() {
  return (
    <AuthProvider>
      <ConsentProvider>
        <HeadContent />
        <Outlet />
        <Toaster />
        {import.meta.env.DEV ? (
          <>
            <ReactQueryDevtools buttonPosition="bottom-left" />
            <TanStackRouterDevtools position="bottom-right" />
          </>
        ) : null}
      </ConsentProvider>
    </AuthProvider>
  )
}
