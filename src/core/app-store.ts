import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { DEFAULT_LOCALE, type SupportedLocale } from '@core/constants'

type UiPrefs = {
  sidebarCollapsed: boolean
}

type AppState = {
  locale: SupportedLocale
  ui: UiPrefs
  setLocale: (locale: SupportedLocale) => void
  setUi: (partial: Partial<UiPrefs>) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      locale: DEFAULT_LOCALE,
      ui: { sidebarCollapsed: false },
      setLocale: (locale) => {
        set({ locale })
      },
      setUi: (partial) => {
        set((s) => ({ ui: { ...s.ui, ...partial } }))
      },
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ locale: s.locale, ui: s.ui }),
    },
  ),
)

export function getAppStoreLocale(): SupportedLocale {
  return useAppStore.getState().locale
}
