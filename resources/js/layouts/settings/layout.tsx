import { router, usePage } from '@inertiajs/react'
import { useMemo, type PropsWithChildren } from 'react'
import { AppPage } from '@/components/app-page'
import { Tab, TabList, Tabs } from '@/components/twc-ui/tabs'
import { Add01Icon} from '@hugeicons/core-free-icons'
import { Toolbar } from '@/components/twc-ui/toolbar'
import { Button } from '@/components/twc-ui/button'

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
        <Tab id={route('app.api-tokens.index', {}, false)} href={route('app.api-tokens.index')}>
          Personal access tokens
        </Tab>
      </TabList>
    </Tabs>
  )
  
  const toolbar = useMemo(
    () => (
      <Toolbar>
        {url === '/settings/api-tokens' && (
          <Button
            variant="toolbar-default"
            icon={Add01Icon}
            title="Create new token"
            onClick={() =>
              router.visit(route('app.api-tokens.create'))
            }
          />
        )}
      </Toolbar>
    ),
    [url]
  )

  return (
    <AppPage
      title="Account settings"
      description="Manage your profile and account settings."
      tabs={tabs}
      toolbar={toolbar}
    >
      {children}
    </AppPage>
  )
}
