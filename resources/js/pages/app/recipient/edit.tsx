import { usePage } from '@inertiajs/react'
import { AppPage } from '@/components/app-page'
import { Button } from '@/components/twc-ui/button'
import { Form, useForm } from '@/components/twc-ui/form'
import { FormCard } from '@/components/twc-ui/form-card'
import { FormGrid } from '@/components/twc-ui/form-grid'
import { FormTextField } from '@/components/twc-ui/form-text-field'
import { appRoute } from '@/lib/utils'
import type { SharedData } from '@/types'

export default function ZoneEdit({ zone }: { zone: App.Data.ZoneData }) {
  const appId = usePage<SharedData>().props.currentAppId

  const form = useForm<App.Data.ZoneData>(
    'zone-edit-form',
    zone.id ? 'put' : 'post',
    zone.id
      ? route('app.zones.update', { app: appId, zone: zone.id })
      : route('app.zones.store', { app: appId }),
    zone
  )
  return (
    <AppPage title="Create Zone" description="Create a new zone">
      <FormCard
        className="mx-auto flex w-full max-w-4xl flex-1"
        footer={
          <>
            <div className="flex-1" />
            <Button
              form={form.id}
              type="submit"
              variant="default"
              title="Save"
              isLoading={form.processing}
            />
          </>
        }
      >
        <Form form={form}>
          <FormGrid className="w-full">
            <div className="col-span-12">
              <FormTextField
                autoFocus
                label="Name"
                isDisabled={!!zone.id}
                isRequired
                placeholder="example.example.com"
                {...form.register('name')}
              />
            </div>
            <div className="col-span-12">
              <FormTextField
                autoFocus={!!zone.id}
                label="Webhook URL"
                isRequired
                placeholder="https://example.com/webhook"
                {...form.register('webhook_url')}
              />
            </div>
            <div className="col-span-24">
              <FormTextField
                label="Description"
                placeholder="Description"
                {...form.register('description')}
              />
            </div>
          </FormGrid>
        </Form>
      </FormCard>
    </AppPage>
  )
}

ZoneEdit.layout = {
  breadcrumbs: [
    {
      title: 'Zones',
      href: appRoute('app.zones.index')
    },
    {
      title: 'Create',
      href: null
    }
  ]
}
