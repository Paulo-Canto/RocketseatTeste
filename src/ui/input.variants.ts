import { cva } from '@ui/variants'

export const inputVariants = cva(
  'flex h-9 w-full rounded-md border border-zinc-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-9',
        sm: 'h-8 text-xs',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)
