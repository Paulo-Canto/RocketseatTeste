import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import * as v from 'valibot'
import { Button } from '@ui/button'
import { login } from '@core/api/session'
import { useSessionStore } from '@core/session-store'
import { PatternForm, PatternTextField } from '@pattern/form'
import type { UnknownForm } from '@pattern/form.contexts'

const loginSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(1)),
})

export const Route = createFileRoute('/_auth/login')({
  component: LoginRoute,
})

function LoginRoute() {
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: { email: '', password: '' },
    onSubmit: async ({ value }) => {
      const parsed = v.parse(loginSchema, value)
      const res = await login({ email: parsed.email, password: parsed.password })
      useSessionStore.getState().setSession({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        user: res.user,
      })
      await navigate({ to: '/dashboard' })
    },
  })

  return (
    <div className="w-full max-w-sm space-y-4">
      <h1 className="text-lg font-semibold">Sign in</h1>
      <PatternForm form={form as unknown as UnknownForm}>
        <PatternTextField name="email" label="Email" type="email" />
        <PatternTextField name="password" label="Password" type="password" />
        <Button type="submit" className="mt-2 w-full">
          Continue
        </Button>
      </PatternForm>
    </div>
  )
}
