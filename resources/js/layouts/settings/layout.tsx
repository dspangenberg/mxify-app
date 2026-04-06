import { Add01Icon } from '@hugeicons/core-free-icons'
import { router, usePage } from '@inertiajs/react'
import { type PropsWithChildren, useMemo } from 'react'
import { AppPage } from '@/components/app-page'
import { Button } from '@/components/twc-ui/button'
import { Tab, TabList, Tabs } from '@/components/twc-ui/tabs'
import { Toolbar } from '@/components/twc-ui/toolbar'

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
