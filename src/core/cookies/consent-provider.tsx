import { type ReactNode, createContext, useContext, useMemo, useState } from 'react'

type ConsentValue = {
  analytics: boolean
  setAnalytics: (v: boolean) => void
}

const ConsentContext = createContext<ConsentValue | null>(null)

type ConsentProviderProps = {
  children: ReactNode
}

export function ConsentProvider({ children }: ConsentProviderProps) {
  const [analytics, setAnalytics] = useState(false)
  const value = useMemo(
    () => ({
      analytics,
      setAnalytics,
    }),
    [analytics],
  )
  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}

export function useConsent() {
  const ctx = useContext(ConsentContext)
  if (!ctx) {
    throw new Error('useConsent must be used within ConsentProvider')
  }
  return ctx
}
