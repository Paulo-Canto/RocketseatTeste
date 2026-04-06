import { cx } from '@ui/variants'

export type HeaderProps = React.HTMLAttributes<HTMLElement>

export function Header({ className, ...props }: HeaderProps) {
  return (
    <header
      data-slot="header"
      className={cx('sticky top-0 z-40 flex h-14 items-center border-b border-zinc-200 bg-white/80 px-4 backdrop-blur', className)}
      {...props}
    />
  )
}
