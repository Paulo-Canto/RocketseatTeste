import { useForm } from '@tanstack/react-form'
import * as v from 'valibot'

export function createFormHook<TValues extends Record<string, unknown>>(defaultValues: TValues) {
  return function usePatternForm() {
    return useForm({
      defaultValues,
    })
  }
}

export function createFormSubmitHandler<TSchema extends v.GenericSchema>(
  schema: TSchema,
  onValid: (value: v.InferOutput<TSchema>) => void | Promise<void>,
) {
  return async (raw: unknown) => {
    const value = v.parse(schema, raw as v.InferInput<TSchema>)
    await onValid(value)
  }
}
