import { usePage } from '@inertiajs/react'
import type { PropsWithChildren } from 'react'
import { AppPage } from '@/components/app-page'
import { Tab, TabList, Tabs } from '@/components/twc-ui/tabs'

export default function SettingsLayout({ children }: PropsWithChildren) {
  const { url } = usePage()

  const tabs = (
    <Tabs variant="underlined" selectedKey={url}>
      <TabList aria-label="Tabs">
        <Tab id={route('app.profile.edit', {}, false)} href={route('app.profile.edit')}>
          Profile
        </Tab>
        <Tab id={route('app.password.edit', {}, false)} href={route('app.password.edit')}>
          Password
        </Tab>
        <Tab id={route('app.api-tokens.edit', {}, false)} href={route('app.api-tokens.edit')}>
          API-tokens
        </Tab>
      </TabList>
    </Tabs>
  )

  return (
    <AppPage
      title="Account settings"
      description="Manage your profile and account settings."
      tabs={tabs}
    >
      {children}
    </AppPage>
  )
}
