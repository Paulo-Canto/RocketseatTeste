import type { AnyRouter } from '@tanstack/react-router'

export function initRouteTracking(router: AnyRouter): void {
  if (import.meta.env.DEV) {
    console.debug('[analytics] route', router.state.location.pathname)
  }
}
