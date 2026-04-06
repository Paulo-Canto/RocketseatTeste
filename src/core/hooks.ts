import { useContext, useSyncExternalStore } from 'react'
import { AuthContext } from '@core/auth-context'

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onStoreChange)
      return () => {
        mql.removeEventListener('change', onStoreChange)
      }
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}
