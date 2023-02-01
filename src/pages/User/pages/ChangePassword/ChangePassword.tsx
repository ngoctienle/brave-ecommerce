import { Fragment } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import omit from 'lodash/omit'

import { userSchema, UserSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'

import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      confirm_password: '',
      new_password: ''
    },
    resolver: yupResolver(passwordSchema)
  })
  const updateProfileMutation = useMutation(userApi.updateProfile)

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))
      toast.success(res.data.message)
      reset()
    } catch (error) {
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

  return (
    <Fragment>
      <div className='border-b border-t border-t-secondary-EDEDF6 border-b-secondary-EDEDF6 p-3 md:py-4 md:px-6 mmd:border-t-0 mmd:border-l mmd:border-l-secondary-EDEDF6'>
        <h1 className='fs-16 font-bold capitalize text-primary-1A162E md:fs-18'>Đổi mật khẩu</h1>
        <p className='fs-14 text-secondary-9E9DA8'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <div className='p-3 md:py-4 md:px-6 mmd:border-l'>
        <form className='mr-auto max-w-2xl' onSubmit={onSubmit}>
          <div className='flex flex-col gap-2 md:gap-3'>
            <p className='fs-14 truncate font-semibold capitalize text-primary-1A162E md:fs-16'>
              Mật khẩu cũ
            </p>
            <Input
              className='relative'
              register={register}
              name='password'
              type='password'
              placeholder='Mật khẩu cũ'
              errorMessage={errors.password?.message}
            />
          </div>
          <div className='flex flex-col gap-2 md:gap-3'>
            <p className='fs-14 font-semibold capitalize text-primary-1A162E md:fs-16'>
              Mật khẩu mới
            </p>
            <Input
              className='relative'
              register={register}
              name='new_password'
              type='password'
              placeholder='Mật khẩu mới'
              errorMessage={errors.new_password?.message}
            />
          </div>
          <div className='flex flex-col gap-2 md:gap-3'>
            <p className='fs-14 font-semibold capitalize text-primary-1A162E md:fs-16'>
              Nhập lại mật khẩu
            </p>
            <Input
              className='relative'
              register={register}
              name='confirm_password'
              type='password'
              placeholder='Nhập lại mật khẩu'
              errorMessage={errors.confirm_password?.message}
            />
          </div>
          <div className='mt-1 flex flex-col'>
            <Button
              className='fs-14 flex h-10 min-w-[80px] items-center justify-center rounded-10 bg-primary-67B044 px-5 text-white transition-colors hover:border-primary-1A162E sm:ml-auto md:fs-16 md:h-10 md:px-5'
              type='submit'>
              Lưu
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  )
}
