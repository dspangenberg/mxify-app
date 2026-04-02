import '../css/app.css'

import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot } from 'react-dom/client'
import { initializeTheme } from './hooks/use-appearance'
import '@fontsource/clear-sans/100.css'
import '@fontsource/ia-writer-quattro';

import '@fontsource-variable/jetbrains-mono'
import type React from 'react'
import { Providers } from './providers'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: async name => {
    return resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx'))
  },
  setup({ el, App, props }) {
    const appElement = (
      <Providers>
        <App {...props} />
      </Providers>
    )

    createRoot(el).render(appElement)
  },
  progress: {
    color: '#4B5563'
  }
})

// This will set light / dark mode on load...
initializeTheme()
