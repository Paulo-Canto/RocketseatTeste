import { cx } from '@ui/variants'

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div data-slot="skeleton" className={cx('animate-pulse rounded-md bg-zinc-200', className)} {...props} />
}
