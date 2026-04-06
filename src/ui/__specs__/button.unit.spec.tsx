import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from '@ui/button'

describe('Button', () => {
  it('renders', () => {
    render(<Button type="button">Click</Button>)
    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument()
  })
})
