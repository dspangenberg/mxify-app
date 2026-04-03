import { createInertiaApp } from '@inertiajs/react'
import { route as routeFn } from 'ziggy-js'
import { initializeTheme } from '@/hooks/use-appearance'
import AppLayout from '@/layouts/app-layout'
import AuthLayout from '@/layouts/auth-layout'
import SettingsLayout from '@/layouts/settings/layout'
import '@fontsource/ia-writer-quattro'
import { Providers } from '@/providers'

if (routeFn) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(globalThis as any).route = routeFn
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: title => (title ? `${title} - ${appName}` : appName),
  layout: name => {
    switch (true) {
      case name === 'home':
        return null
      case name.startsWith('auth/'):
        return AuthLayout
      case name.startsWith('settings/'):
        return [AppLayout, SettingsLayout]
      default:
        return AppLayout
    }
  },
  strictMode: true,
  withApp(app) {
    return <Providers>{app}</Providers>
  },
  progress: {
    color: '#4B5563'
  }
})

// This will set light / dark mode on load...
initializeTheme()
