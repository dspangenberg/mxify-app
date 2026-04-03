import { Head, Link } from '@inertiajs/react'
import { Button } from '@/components/twc-ui/button'
import { Checkbox } from '@/components/twc-ui/checkbox'
import { Form, useForm } from '@/components/twc-ui/form'
import { FormGrid } from '@/components/twc-ui/form-grid'
import { FormPasswordField } from '@/components/twc-ui/form-password-field'
import { FormTextField } from '@/components/twc-ui/form-text-field'

type LoginForm = {
  email: string
  password: string
  remember: boolean
}

interface LoginProps {
  status?: string
  canResetPassword: boolean
  canRegister: boolean
}

export default function Login({ status, canRegister, canResetPassword }: LoginProps) {
  const form = useForm<App.Data.LoginData>(
    'auth-login-form',
    'post',
    route('login'),
    {
      email: '',
      password: '',
      remember: false
    },
    { validateOn: 'blur' }
  )


  return (
    <>
      <Head title="Log in" />

      <Form form={form}>
        <FormGrid>
          <div className="col-span-24">
            <FormTextField
              autoComplete="username"
              label="E-Mail"
              autoFocus
              {...form.register('email')}
            />
          </div>
          <div className="col-span-24">
            <FormPasswordField
              label="Kennwort"
              {...form.register('password')}
              labelAddon={
                <span>
                  {canResetPassword && (
                    <Link
                      href={route('password.request')}
                      className="rounded-xs text-gray-600 text-sm underline hover:text-gray-900"
                    >
                      Forgot password?
                    </Link>
                  )}
                </span>
              }
            />

            <div className="mt-1">
              <Checkbox {...form.registerCheckbox('remember')} className="pt-1.5">
                Remember me
              </Checkbox>
            </div>
          </div>
          <div className="col-span-24">
            <Button
              type="submit"
              className="mt-4 w-full"
              isDisabled={form.processing}
              isLoading={form.processing}
              title="Login"
            />
            {canRegister && (
              <div className='text-center text-muted-foreground text-sm mt-3'>
                Don't have an account? <Link href={route('register')} className="underline">Sign up</Link>
              </div>
            )}
          </div>
        </FormGrid>
      </Form>

      {status && (
        <div className="mb-4 text-center font-medium text-green-600 text-sm">{status}</div>
      )}
    </>
  )
}

Login.layout = {
  title: 'Log in to your account',
  description: 'Enter your email and password below to log in'
}
