import inertia from '@inertiajs/vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'
import { run } from 'vite-plugin-run'

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.tsx'],
      refresh: true
    }),
    inertia({ ssr: false }),
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler']
      }
    }),
    run([
      {
        name: 'typescript transform',
        run: ['php', 'artisan', 'typescript:transform'],
        pattern: ['app/**/*Data.php', 'app/**/Enums/**/*.php']
      },
      {
        name: 'build routes',
        run: ['php', 'artisan', 'routes:generate'],
        condition: file => file.includes('/routes/')
      }
    ]),
    tailwindcss()
  ],
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  server: {
    watch: {
      ignored: ['**/.idea/**', '**/storage/**', '**/vendor/**', '**/.git/**']
    }
  }
})
