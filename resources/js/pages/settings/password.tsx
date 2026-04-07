import { Transition } from '@headlessui/react'
import { usePage } from '@inertiajs/react'
import { Button } from '@/components/twc-ui/button'
import { Form, useForm } from '@/components/twc-ui/form'
import { FormCard } from '@/components/twc-ui/form-card'
import { FormGrid } from '@/components/twc-ui/form-grid'
import { FormPasswordField } from '@/components/twc-ui/form-password-field'
import { appDashboardRoute, appRoute } from '@/lib/utils'
import type { SharedData } from '@/types'

type PaswordForm = {
  current_password: string
  password: string
  password_confirmation: string
}

export default function Password() {
  const form = useForm<PaswordForm>(
    'update-password-form',
    'put',
    route('app.password.update'),
    {
      current_password: '',
      password: '',
      password_confirmation: ''
    },
    {
      validateOn: 'blur',
      onSuccess: () => form.reset()
    }
  )

  const { auth } = usePage<SharedData>().props
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
              <p className="text-sm text-success">Password updated successfully.</p>
            </Transition>
          </div>
          <Button
            form={form.id}
            type="submit"
            variant="default"
            title="Save password"
            isLoading={form.processing}
          />
        </>
      }
    >
      <Form form={form}>
        <FormGrid>
          <div className="col-span-8">
            <input
              type="text"
              name="username"
              value={auth.user.email}
              readOnly
              tabIndex={-1}
              autoComplete="username"
              aria-hidden="true"
              className="sr-only"
            />

            <FormPasswordField
              autoFocus
              isRequired
              label="Current password"
              {...form.register('current_password')}
            />
          </div>
          <div className="col-span-8">
            <FormPasswordField
              isRequired
              label="New password"
              showStrength
              showHint
              autoComplete="new-password"
              {...form.register('password')}
            />
          </div>
          <div className="col-span-8">
            <FormPasswordField
              isRequired
              label="Confirm password"
              autoComplete="new-password"
              {...form.register('password_confirmation')}
            />
          </div>
        </FormGrid>
      </Form>
    </FormCard>
  )
}

Password.layout = {
  breadcrumbs: [
    {
      title: 'Dashboard',
      href: appDashboardRoute()
    },
    {
      title: 'Account settings',
      href: appRoute('app.settings')
    },
    {
      title: 'Password',
      href: appRoute('app.password.edit')
    }
  ]
}
