import { type ReactNode } from 'react'
import { FormField, FormLabel, FormMessage } from '@ui/form'
import { Input } from '@ui/input'
import { PatternFormApiProvider, usePatternFormApi, type UnknownForm } from '@pattern/form.contexts'

type PatternFormProps = {
  form: UnknownForm
  children: ReactNode
}

export function PatternForm({ form, children }: PatternFormProps) {
  return (
    <PatternFormApiProvider value={form}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          void form.handleSubmit()
        }}
      >
        {children}
      </form>
    </PatternFormApiProvider>
  )
}

type TextFieldProps = {
  name: string
  label: string
  type?: HTMLInputElement['type']
}

export function PatternTextField({ name, label, type = 'text' }: TextFieldProps) {
  const form = usePatternFormApi()
  return (
    <form.Field name={name}>
      {(field) => (
        <FormField>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Input
            id={name}
            name={name}
            type={type}
            value={String(field.state.value ?? '')}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
          />
          {field.state.meta.errors.map((err) => (
            <FormMessage key={String(err)}>{String(err)}</FormMessage>
          ))}
        </FormField>
      )}
    </form.Field>
  )
}
