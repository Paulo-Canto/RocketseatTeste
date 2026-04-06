import { type ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react'
import { DEFAULT_LOCALE, type SupportedLocale } from '@core/constants'
import { useAppStore } from '@core/app-store'

type Messages = Record<string, string>

const I18nContext = createContext<{
  locale: SupportedLocale
  messages: Messages
  t: (key: string) => string
  setLocale: (locale: SupportedLocale) => Promise<void>
} | null>(null)

async function loadLocaleMessages(locale: SupportedLocale): Promise<Messages> {
  if (locale === 'en') {
    const mod = await import('@core/locales/en.json')
    return mod.default as Messages
  }
  const mod = await import('@core/locales/pt.json')
  return mod.default as Messages
}

export async function bootstrapI18n(initialLocale: SupportedLocale): Promise<{
  locale: SupportedLocale
  messages: Messages
}> {
  const locale = initialLocale
  const messages = await loadLocaleMessages(locale)
  return { locale, messages }
}

type I18nProviderProps = {
  children: ReactNode
  initialLocale: SupportedLocale
  initialMessages: Messages
}

export function I18nProvider({ children, initialLocale, initialMessages }: I18nProviderProps) {
  const setStoreLocale = useAppStore((s) => s.setLocale)
  const [locale, setLocaleState] = useState<SupportedLocale>(initialLocale)
  const [messages, setMessages] = useState<Messages>(initialMessages)

  const setLocale = useCallback(
    async (next: SupportedLocale) => {
      const nextMessages = await loadLocaleMessages(next)
      setLocaleState(next)
      setMessages(nextMessages)
      setStoreLocale(next)
    },
    [setStoreLocale],
  )

  const t = useCallback(
    (key: string) => {
      return messages[key] ?? key
    },
    [messages],
  )

  const value = useMemo(
    () => ({
      locale,
      messages,
      t,
      setLocale,
    }),
    [locale, messages, setLocale, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return ctx
}

export function getDefaultMessages(): Promise<Messages> {
  return loadLocaleMessages(DEFAULT_LOCALE)
}
