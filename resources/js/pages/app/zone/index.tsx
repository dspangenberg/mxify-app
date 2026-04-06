import { Add01Icon } from '@hugeicons/core-free-icons'
import { router, usePage } from '@inertiajs/react'
import { AppPage } from '@/components/app-page'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/twc-ui/button'
import { Toolbar } from '@/components/twc-ui/toolbar'
import { appDashboardRoute, appRoute } from '@/lib/utils'
import type { SharedData } from '@/types'
import { columns } from './index-columns'
export default function ZoneIndex({
  zones
}: {
  zones: App.Data.Paginated.PaginationMeta<App.Data.ZoneData[]>
}) {
  const appId = usePage<SharedData>().props.currentAppId
  return (
    <AppPage
      title="Zones"
      toolbar={
        <Toolbar>
          <Button
            variant="toolbar-default"
            icon={Add01Icon}
            title="Create new zone"
            onClick={() => router.visit(appRoute('app.zones.create'))}
          />
        </Toolbar>
      }
    >
      <DataTable
        columns={columns}
        data={zones.data}
        pagination={{
          current_page: zones.current_page,
          last_page: zones.last_page,
          per_page: zones.per_page,
          total: zones.total
        }}
        onPageChange={page => router.get(appRoute('app.zones.index', { page }))}
        itemName="Zones"
      />
    </AppPage>
  )
}

ZoneIndex.layout = {
  breadcrumbs: [
    {
      title: 'Dashboard',
      href: appDashboardRoute()
    },
    {
      title: 'Zones',
      href: '#'
    }
  ]
}
