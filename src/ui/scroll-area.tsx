import { cx } from '@ui/variants'

export type ScrollAreaProps = React.HTMLAttributes<HTMLDivElement>

export function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (
    <div data-slot="scroll-area" className={cx('relative overflow-hidden', className)} {...props}>
      <div className="h-full w-full overflow-auto rounded-[inherit]">{children}</div>
    </div>
  )
}
