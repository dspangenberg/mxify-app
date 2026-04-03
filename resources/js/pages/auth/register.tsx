import { Head, Link } from '@inertiajs/react'
import { Button } from '@/components/twc-ui/button'
import { Form, useForm } from '@/components/twc-ui/form'
import { FormGrid } from '@/components/twc-ui/form-grid'
import { FormPasswordField } from '@/components/twc-ui/form-password-field'
import { FormTextField } from '@/components/twc-ui/form-text-field'

type RegisterForm = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export default function Register() {
  const form = useForm<RegisterForm>(
    'auth-register-form',
    'post',
    route('register'),
    {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    { validateOn: 'blur' }
  )



  return (
    <>
      <Head title="Register" />
      <Form form={form}>
        <FormGrid>

          <div className="col-span-24">
            <FormTextField
              autoFocus
              autoComplete="fullname"
              label="Name"
              placeholder="Full name"
              {...form.register('name')}
            />
          </div>
          <div className="col-span-24">
            <FormTextField
              autoComplete="email"
              label="Email address"
              placeholder="email@example.com"
              {...form.register('email')}
            />
          </div>
          <div className="col-span-24">
            <FormPasswordField
              label="Password"
              new-password
              placeholder="Password"
              autoComplete="new-password"
              showStrength
              showHint
              {...form.register('password')}
            />
          </div>
          <div className="col-span-24">
            <FormPasswordField
              label="Confirm password"
              autoComplete="new-password"
              placeholder="Password"
              {...form.register('password_confirmation')}
            />
          </div>
          <div className="col-span-24">
            <Button
              type="submit"
              className="mt-4 w-full"
              isDisabled={form.processing}
              isLoading={form.processing}
              title="Create account"
            />
            <div className='mt-3 text-center text-muted-foreground text-sm'>
              Already have an account? <Link href={route('login')} className="underline">Login</Link>
            </div>
          </div>
        </FormGrid>
      </Form>
    </>
  )
}

Register.layout = {
  title: 'Create an account',
  description: 'Enter your details below to create your account',
}
