import { createFileRoute, Link } from '@tanstack/react-router'
import { buttonVariants } from '@ui/button.variants'
import { cx } from '@ui/variants'

export const Route = createFileRoute('/_auth/register')({
  component: RegisterRoute,
})

function RegisterRoute() {
  return (
    <div className="w-full max-w-sm space-y-4 text-center">
      <h1 className="text-lg font-semibold">Register</h1>
      <p className="text-sm text-zinc-600">Placeholder screen.</p>
      <Link to="/login" className={cx(buttonVariants({ variant: 'outline' }), 'inline-flex')}>
        Back to sign in
      </Link>
    </div>
  )
}
