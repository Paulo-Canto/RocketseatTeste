import { useAppStore } from '@core/app-store'
import { SUPPORTED_LOCALES, type SupportedLocale } from '@core/constants'
import { useI18n } from '@core/i18n'
import { FormField, FormLabel } from '@ui/form'
import { Select } from '@ui/select'

export function SettingsPage() {
  const { locale, setLocale, t } = useI18n()
  const setUi = useAppStore((s) => s.setUi)
  const sidebarCollapsed = useAppStore((s) => s.ui.sidebarCollapsed)

  return (
    <div className="max-w-md space-y-6">
      <h1 className="text-xl font-semibold">{t('nav.settings')}</h1>
      <FormField>
        <FormLabel htmlFor="locale">Language</FormLabel>
        <Select
          id="locale"
          value={locale}
          onChange={(e) => void setLocale(e.target.value as SupportedLocale)}
        >
          {SUPPORTED_LOCALES.map((loc) => (
            <option key={loc} value={loc}>
              {loc.toUpperCase()}
            </option>
          ))}
        </Select>
      </FormField>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={sidebarCollapsed}
          onChange={(e) => setUi({ sidebarCollapsed: e.target.checked })}
        />
        Collapse sidebar (persisted)
      </label>
    </div>
  )
}
