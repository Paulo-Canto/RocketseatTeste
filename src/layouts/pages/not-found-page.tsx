import { Link } from '@tanstack/react-router'
import { buttonVariants } from '@ui/button.variants'
import { cx } from '@ui/variants'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-semibold">Not found</h1>
      <p className="text-zinc-600">The page could not be located.</p>
      <Link to="/" className={cx(buttonVariants())}>
        Go home
      </Link>
    </div>
  )
}
