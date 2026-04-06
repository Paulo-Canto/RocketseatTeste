import { type ReactNode } from 'react'

export type AuthLayoutProps = {
  children: ReactNode
  appVersion?: string
}

export function AuthLayout({ children, appVersion }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600">
        {appVersion ? <span data-testid="app-version">v{appVersion}</span> : null}
      </header>
      <main className="flex flex-1 items-center justify-center p-6">{children}</main>
    </div>
  )
}
