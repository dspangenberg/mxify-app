import { Transition } from '@headlessui/react'
import { Button } from '@/components/twc-ui/button'
import { Form, useForm } from '@/components/twc-ui/form'
import { FormCard } from '@/components/twc-ui/form-card'
import { FormGrid } from '@/components/twc-ui/form-grid'
import { FormTextField } from '@/components/twc-ui/form-text-field'
import { FormCheckboxGroup } from '@/components/twc-ui/form-checkbox-group'
import { FormDatePicker } from '@/components/twc-ui/form-date-picker'

interface Ability {
  name: string
  description: string
}

export default function ApiTokenCreate ({
  token
}
: { token: App.Data.ApiTokenData }) {

  const form = useForm<App.Data.ApiTokenData>(
    'auth-login-form',
    'post',
    route('app.api-tokens.store'),
    token,
    { validateOn: 'blur' }
  )

  const abilities: Ability[] = [
    {
      name: 'route',
      description: 'can route mails'
    },
    {
      name: 'zone:create',
      description: 'can create zones'
    },
    {
      name: 'zone:update',
      description: 'can update zones'
    },
    {
      name: 'zone:delete',
      description: 'can delete zones'
    },
    {
      name: 'recipient:create',
      description: 'can create recipients'
    },
    {
      name: 'recipient:update',
      description: 'can update recipients'
    },
    {
      name: 'recipient:delete',
      description: 'can delete recipients'
    }
  ]

  return (
    <FormCard
      className="mx-auto flex w-full max-w-4xl flex-1"
      footerClassName="flex justify-between gap-2"
      footer={
        <>
          <div className="flex-1">
            <Transition
              show={form.recentlySuccessful}
              enter="transition ease-in-out"
              enterFrom="opacity-0"
              leave="transition ease-in-out"
              leaveTo="opacity-0"
            >
              <p className="text-sm text-success">Profile updated successfully.</p>
            </Transition>
          </div>
          <Button
            form={form.id}
            type="submit"
            variant="default"
            title="Update Profile"
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
              isRequired
              placeholder="Description"
              {...form.register('name')}
            />
          </div>
          <div className="col-span-5">
            <FormDatePicker isRequired maxYears={50} label="Expires at" {...form.register('expires_at')} />
          </div>
          <div className="col-span-24">
            <FormCheckboxGroup
              label="Abilities:"
              listClassName="grid grid-cols-4 gap-x-2"
              {...form.register('abilities')}
              items={abilities}
              itemValue="name"
              itemName="description"
            />

          </div>
        </FormGrid>
      </Form>
    </FormCard>
  )
}

ApiTokenCreate.layout = {
  breadcrumbs: [
    {
      title: 'Dashboard',
      href: route('app.dashboard')
    },
    {
      title: 'Account settings',
      href: route('app.settings')
    },
    {
      title: 'Profile',
      href: route('app.profile.edit')
    }
  ]
}
