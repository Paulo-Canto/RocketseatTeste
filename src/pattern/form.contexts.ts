import { createContext, useContext } from 'react'
import type { ReactFormExtendedApi } from '@tanstack/react-form'

export type UnknownForm = ReactFormExtendedApi<
  Record<string, unknown>,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined
>

const FormApiContext = createContext<UnknownForm | null>(null)

export function usePatternFormApi(): UnknownForm {
  const ctx = useContext(FormApiContext)
  if (!ctx) {
    throw new Error('usePatternFormApi must be used within PatternFormProvider')
  }
  return ctx
}

export const PatternFormApiProvider = FormApiContext.Provider
