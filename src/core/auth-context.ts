import { createContext } from 'react'

export type AuthStatus = 'unknown' | 'guest' | 'authenticated'

export type AuthContextValue = {
  status: AuthStatus
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
