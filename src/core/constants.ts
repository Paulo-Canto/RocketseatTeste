export const APP_NAME = 'spa-blueprint'

export const DEFAULT_LOCALE = 'en'

export const SUPPORTED_LOCALES = ['en', 'pt'] as const

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]
