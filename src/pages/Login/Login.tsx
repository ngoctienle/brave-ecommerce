import { Fragment, useContext } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import { AppContext } from 'src/contexts/app.context'
import useQueryParams from 'src/hooks/useQueryParams'

import { ErrorRespone } from 'src/types/utils.type'
import { schema, Schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

import authApi from 'src/apis/auth.api'

import Input from 'src/components/Input'
import Button from 'src/components/Button'
import paths from 'src/constants/paths'
import Brand from 'src/components/Brand'

type FormData = Pick<Schema, 'email' | 'password'>

const LoginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const { setIsAuthenticated, setUserProfile } = useContext(AppContext)
  const { t } = useTranslation('general')
  const navigate = useNavigate()
  const params = useQueryParams()
  const queryRedirect = Object.keys(params).length !== 0 ? '/' + Object.values(params) : '/'

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(LoginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.LoginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setUserProfile(data.data.data.user)
        navigate({
          pathname: queryRedirect
        })
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorRespone<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                /* message: formError[key as keyof FormData], */
                message: 'wrong-auth',
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <Fragment>
      <Helmet>
        <title>Brave Ecommerce | {t('general:sign-in')}</title>
        <meta name='description' content='Helmet application' />
      </Helmet>
      <div className='grid h-screen grid-cols-1 md:grid-cols-12'>
        <div className='hidden md:col-span-6 md:block md:bg-FAFAFD'>
          <div className='md:flex md:h-full md:flex-col md:items-center md:justify-center md:px-4'>
            <img
              src='/assets/auth-img.svg'
              alt={t('general:auth-desc') as string}
              title={t('general:auth-desc') as string}
              className='w-[350px] lg:w-[420px]'
            />
            <p className='fs-18 mt-10 max-w-[420px] text-center lg:fs-20'>
              {t('general:auth-desc')}
            </p>
          </div>
        </div>
        <div className='bg-white md:col-span-6'>
          <div className='flex h-full flex-col items-center justify-around py-[50px] px-4'>
            <Link to='/' className='flex max-w-max items-center'>
              <Brand />
            </Link>
            <form onSubmit={onSubmit} className='w-full sm:w-[350px] lg:w-[460px]' noValidate>
              <h1 className='fs-22 text-center font-bold text-primary-1A162E lg:fs-30'>
                {t('general:sign-in')}
              </h1>
              <p className='fs-14 mt-[10px] text-center text-secondary-9E9DA8 md:fs-16'>
                {t('general:sign-desc')}
              </p>
              <Input
                className='mt-5 sm:mt-10'
                type='email'
                name='email'
                placeholder={t('general:email') as string}
                register={register}
                errorMessage={errors.email?.message}
              />
              <Input
                className='relative mt-1'
                type='password'
                name='password'
                placeholder={t('general:pw') as string}
                autoComplete='on'
                register={register}
                errorMessage={errors.password?.message}
              />
              <div className='mt-4'>
                <Button
                  type='submit'
                  className='fs-14 flex h-10 w-full items-center justify-center rounded-10 bg-primary-FFB700 font-semibold uppercase text-primary-1A162E md:fs-16 md:h-[50px]'
                  isLoading={loginAccountMutation.isLoading}
                  disabled={loginAccountMutation.isLoading}>
                  {t('general:sign-in')}
                </Button>
              </div>
            </form>
            <div className='flex items-center justify-center'>
              <span className='fs-14 text-secondary-9E9DA8 md:fs-18'>
                {t('general:have-account')}
              </span>
              <Link
                className='fs-14 ml-2 font-semibold capitalize text-primary-0071DC md:fs-18'
                to={paths.register}>
                {t('general:sign-up')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
