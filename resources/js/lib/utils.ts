import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const focusRing = tv({
  base: 'outline-none',
  variants: {
    isFocusVisible: {
      false: 'outline-0',
      true: 'border-ring ring-[3px] ring-ring/50'
    }
  }
})

export function appRoute(name: string, params?: Record<string, unknown>) {
  const match = window.location.pathname.match(/^\/app\/([^/]+)/)
  const appId = match?.[1]

  if (!appId) return '#'
  return route(name, { app: appId, ...params }, false)
}

export function appDashboardRoute() {
  return appRoute('app.dashboard')
}
