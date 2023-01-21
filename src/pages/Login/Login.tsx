import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import { AppContext } from 'src/contexts/app.context'

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
  const navigate = useNavigate()

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
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorRespone<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='grid h-screen grid-cols-1 md:grid-cols-12'>
      <div className='bg-FAFAFD md:col-span-6'>
        <div className='flex h-full flex-col items-center justify-center'>
          <img src='/assets/auth-img.svg' alt='' title='' />
          <p className='fs-20 mt-10 max-w-[420px] text-center'>
            The best of luxury brand values, high quality products, and innovative services
          </p>
        </div>
      </div>
      <div className='bg-white md:col-span-6'>
        <div className='flex h-full flex-col items-center justify-around py-[50px]'>
          <Link to='/' className='flex max-w-max items-center'>
            <Brand />
          </Link>
          <form onSubmit={onSubmit} className='mt-10 w-[460px]' noValidate>
            <h1 className='fs-30 text-center font-bold text-primary-1A162E'>Sign In</h1>
            <p className='fs-14 mt-[10px] text-center text-secondary-9E9DA8'>
              {' '}
              Welcome back to sign in. As a returning customer, you have access to your previously
              saved all information.
            </p>
            <Input
              className='mt-10'
              type='email'
              name='email'
              placeholder='Email'
              register={register}
              errorMessage={errors.email?.message}
            />
            <Input
              className='mt-1'
              type='password'
              name='password'
              placeholder='Password'
              autoComplete='on'
              register={register}
              errorMessage={errors.password?.message}
            />
            <div className='mt-8'>
              <Button
                type='submit'
                className='fs-16 flex h-[50px] w-full items-center justify-center rounded-10 bg-primary-FFB700 font-semibold uppercase text-primary-1A162E'
                isLoading={loginAccountMutation.isLoading}
                disabled={loginAccountMutation.isLoading}>
                Đăng Nhập
              </Button>
            </div>
          </form>
          <div className='mt-[60px] flex items-center justify-center'>
            <span className='fs-18 text-secondary-9E9DA8'>Bạn chưa có tài khoản?</span>
            <Link
              className='fs-18 ml-2 font-semibold capitalize text-primary-0071DC'
              to={paths.register}>
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
