import type { IconSvgElement } from '@hugeicons/react'
import type { Config } from 'ziggy-js'

export interface Auth {
  user: User
}

export interface BreadcrumbItem {
  title: string
  href: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export interface NavItem {
  title: string
  href: string
  icon?: IconSvgElement
  isActive?: boolean
}

export interface SharedData {
  name: string
  quote: { message: string; author: string }
  auth: Auth
  ziggy: Config & { location: string }
  apps: App.Data.AppData[]
  currentAppId: number | null
  sidebarOpen: boolean
  canRegister: boolean
  [key: string]: unknown
}

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  avatar_url: string | null
  pending_email: string | null
  email_verified_at: string | null
  created_at: string
  updated_at: string
  [key: string]: unknown // This allows for additional properties...
}

export interface FlashDataType {
  toast?: { type: 'success' | 'error'; message: string }
}
