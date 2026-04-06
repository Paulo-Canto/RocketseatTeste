import { describe, expect, it } from 'vitest'
import { isRecord } from '@core/utils'

describe('isRecord', () => {
  it('narrows plain objects', () => {
    expect(isRecord({})).toBe(true)
    expect(isRecord(null)).toBe(false)
    expect(isRecord([])).toBe(false)
  })
})
