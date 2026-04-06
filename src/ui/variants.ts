import { cva } from 'class-variance-authority'
import { twMerge, type ClassNameValue } from 'tailwind-merge'

export { cva }

export function cx(...inputs: ClassNameValue[]): string {
  return twMerge(inputs)
}

export function compose(
  base: string,
  ...variants: Array<string | undefined | false>
): string {
  return twMerge(base, ...variants.filter(Boolean))
}
