import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { bootstrapI18n, I18nProvider } from '@core/i18n'
import { initRouteTracking } from '@core/analytics/route-tracking'
import { useAppStore } from '@core/app-store'
import { initializeAuth } from '@core/auth-provider'
import { createAppQueryClient } from './query-client'
import { routeTree } from './routeTree.gen'
import './index.css'

const queryClient = createAppQueryClient()

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

async function bootstrap() {
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MSW === 'true') {
    const { worker } = await import('@mocks/browser')
    await worker.start({ onUnhandledRequest: 'bypass' })
  }

  await initializeAuth()

  const locale = useAppStore.getState().locale
  const { messages, locale: activeLocale } = await bootstrapI18n(locale)

  initRouteTracking(router)

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <I18nProvider initialLocale={activeLocale} initialMessages={messages}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </I18nProvider>
    </StrictMode>,
  )
}

void bootstrap()
