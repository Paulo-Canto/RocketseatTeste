import { Link } from '@tanstack/react-router'
import { type ReactNode } from 'react'
import { Header } from '@ui/header'
import { useI18n } from '@core/i18n'
import { useAuth } from '@core/hooks'

export type MainLayoutProps = {
  children: ReactNode
  appVersion?: string
}

export function MainLayout({ children, appVersion }: MainLayoutProps) {
  const { t } = useI18n()
  const { signOut } = useAuth()

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <Header>
        <nav className="flex w-full items-center justify-between gap-4">
          <div className="flex gap-4 text-sm font-medium">
            <Link to="/dashboard" className="text-zinc-700 hover:text-zinc-900">
              {t('nav.dashboard')}
            </Link>
            <Link to="/items" search={{ page: 1 }} className="text-zinc-700 hover:text-zinc-900">
              {t('nav.items')}
            </Link>
            <Link to="/settings" className="text-zinc-700 hover:text-zinc-900">
              {t('nav.settings')}
            </Link>
            <Link to="/profile" className="text-zinc-700 hover:text-zinc-900">
              {t('nav.profile')}
            </Link>
          </div>
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            {appVersion ? <span>v{appVersion}</span> : null}
            <button type="button" className="text-zinc-700 underline" onClick={() => void signOut()}>
              Sign out
            </button>
          </div>
        </nav>
      </Header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
