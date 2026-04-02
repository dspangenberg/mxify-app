import type { VisitOptions } from '@inertiajs/core'
import type { Config, RouteParamsWithQueryOverload } from 'ziggy-js'

declare global {
  const route: (<T extends string = string>(
    name?: T,
    params?: RouteParamsWithQueryOverload,
    absolute?: boolean,
    config?: Config
  ) => string) & {
    current(): string | null
    current(name: string, params?: RouteParamsWithQueryOverload): boolean
    check(name: string): boolean
    has(name: string): boolean
  }
}

declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: VisitOptions
  }
}
