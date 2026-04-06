let counter = 0

export function createDomId(prefix = 'id'): string {
  counter += 1
  return `${prefix}-${counter}`
}
