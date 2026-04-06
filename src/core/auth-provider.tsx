import { useQueryClient } from '@tanstack/react-query'
import { type ReactNode, useCallback, useMemo } from 'react'
import { AuthContext, type AuthContextValue, type AuthStatus } from '@core/auth-context'
import { logout, refreshSession as refreshSessionApi } from '@core/api/session'
import { registerSessionRefresh } from '@core/http-resource'
import { useSessionStore } from '@core/session-store'

export async function initializeAuth(): Promise<void> {
  const { accessToken, refreshToken, user } = useSessionStore.getState()
  if (accessToken && user) {
    registerSessionRefresh(async () => {
      if (!refreshToken) return false
      try {
        const next = await refreshSessionApi({ refreshToken })
        useSessionStore.getState().setTokens(next.accessToken, next.refreshToken)
        return true
      } catch {
        useSessionStore.getState().clearSession()
        return false
      }
    })
  } else {
    registerSessionRefresh(async () => false)
  }
}

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient()
  const accessToken = useSessionStore((s) => s.accessToken)
  const user = useSessionStore((s) => s.user)

  const status: AuthStatus = accessToken && user ? 'authenticated' : 'guest'

  const signOut = useCallback(async () => {
    try {
      await logout()
    } catch {
      /* ignore */
    }
    useSessionStore.getState().clearSession()
    await queryClient.invalidateQueries()
  }, [queryClient])

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      signOut,
    }),
    [signOut, status],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
