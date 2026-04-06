import { create } from 'zustand'

export type SessionUser = {
  id: string
  label: string
}

type SessionState = {
  accessToken: string | null
  refreshToken: string | null
  user: SessionUser | null
  setSession: (payload: {
    accessToken: string
    refreshToken?: string | null
    user: SessionUser
  }) => void
  clearSession: () => void
  setTokens: (accessToken: string, refreshToken: string | null) => void
}

export const useSessionStore = create<SessionState>((set) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  setSession: ({ accessToken, refreshToken, user }) => {
    set({
      accessToken,
      refreshToken: refreshToken ?? null,
      user,
    })
  },
  clearSession: () => {
    set({ accessToken: null, refreshToken: null, user: null })
  },
  setTokens: (accessToken, refreshToken) => {
    set({ accessToken, refreshToken })
  },
}))

export function getSessionSnapshot(): Pick<SessionState, 'accessToken' | 'refreshToken' | 'user'> {
  return useSessionStore.getState()
}
