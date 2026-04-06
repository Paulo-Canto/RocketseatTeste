import { describe, expect, it } from 'vitest'
import { routeTree } from '../../routeTree.gen'

describe('route tree', () => {
  it('loads generated route tree', () => {
    expect(routeTree).toBeDefined()
  })
})
