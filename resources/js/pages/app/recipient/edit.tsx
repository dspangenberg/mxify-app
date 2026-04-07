import { usePage } from '@inertiajs/react'
import { AppPage } from '@/components/app-page'
import { Button } from '@/components/twc-ui/button'
import { Form, useForm } from '@/components/twc-ui/form'
import { FormCard } from '@/components/twc-ui/form-card'
import { FormComboBox } from '@/components/twc-ui/form-combo-box'
import { FormGrid } from '@/components/twc-ui/form-grid'
import { FormTextField } from '@/components/twc-ui/form-text-field'
import { appRoute } from '@/lib/utils'
import type { SharedData } from '@/types'

export default function RecipientEdit({
  recipient,
  zones
}: {
  recipient: App.Data.RecipientData
  zones: App.Data.ZoneData[]
}) {
  const appId = usePage<SharedData>().props.currentAppId

  const form = useForm<App.Data.RecipientData>(
    'recipient-edit-form',
    recipient.id ? 'put' : 'post',
    recipient.id
      ? route('app.recipients.update', { app: appId, recipient: recipient.id })
      : route('app.recipients.store', { app: appId }),
    recipient
  )
  return (
    <AppPage title="Create recipient">
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
              <FormComboBox autoFocus label="Zone" items={zones} {...form.register('zone_id')} />
            </div>
            <div className="col-span-12">
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

RecipientEdit.layout = {
  breadcrumbs: [
    {
      title: 'Recipients',
      href: appRoute('app.recipients.index')
    },
    {
      title: 'Create',
      href: null
    }
  ]
}
