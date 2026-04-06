import { cva } from '@ui/variants'

export const dataGridShellVariants = cva('flex w-full flex-col gap-2 rounded-lg border border-zinc-200 bg-white', {
  variants: {
    density: {
      default: 'p-3',
      compact: 'p-2 text-sm',
    },
  },
  defaultVariants: { density: 'default' },
})
