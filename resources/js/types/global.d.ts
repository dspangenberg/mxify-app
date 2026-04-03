import type { VisitOptions } from '@inertiajs/core'
import type { route as routeFn } from 'ziggy-js'

declare global {
  var route: typeof routeFn
}

declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: VisitOptions
  }
}
