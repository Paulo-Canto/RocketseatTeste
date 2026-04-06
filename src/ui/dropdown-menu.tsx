import { Menu } from '@base-ui/react/menu'
import { cx } from '@ui/variants'

export const DropdownMenu = Menu.Root
export const DropdownMenuTrigger = Menu.Trigger

export function DropdownMenuContent({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <Menu.Portal>
      <Menu.Positioner sideOffset={8}>
        <Menu.Popup className={cx('z-50 min-w-[10rem] rounded-md border border-zinc-200 bg-white p-1 shadow-md outline-none', className)}>
          {children}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  )
}

export function DropdownMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof Menu.Item>) {
  const extra = typeof className === 'string' ? className : undefined
  return (
    <Menu.Item
      {...props}
      className={cx(
        'cursor-pointer rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-zinc-100',
        extra,
      )}
    />
  )
}
