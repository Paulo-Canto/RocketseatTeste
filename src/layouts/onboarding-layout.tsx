import { type ReactNode } from 'react'

export type OnboardingLayoutProps = {
  children: ReactNode
}

export function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-100 to-white p-8">
      <div className="mx-auto max-w-lg">{children}</div>
    </div>
  )
}
