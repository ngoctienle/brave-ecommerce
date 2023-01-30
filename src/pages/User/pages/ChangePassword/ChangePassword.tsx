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
      <div className='border-b border-l border-b-secondary-EDEDF6 border-l-secondary-EDEDF6 py-4 px-6'>
        <h1 className='fs-18 font-bold capitalize text-primary-1A162E'>Đổi mật khẩu</h1>
        <p className='fs-14 text-secondary-9E9DA8'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <div className='border-l border-b-secondary-EDEDF6 py-4 px-6'>
        <form className='mr-auto max-w-2xl' onSubmit={onSubmit}>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <p className='w-[20%] truncate pt-[15px] capitalize text-primary-1A162E'>Mật khẩu cũ</p>
            <Input
              className='relative w-[80%] flex-grow'
              register={register}
              name='password'
              type='password'
              placeholder='Mật khẩu cũ'
              errorMessage={errors.password?.message}
            />
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <p className='w-[20%] truncate pt-[15px] capitalize text-primary-1A162E'>
              Mật khẩu mới
            </p>
            <Input
              className='relative w-[80%] flex-grow'
              register={register}
              name='new_password'
              type='password'
              placeholder='Mật khẩu mới'
              errorMessage={errors.new_password?.message}
            />
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <p className='w-[20%] truncate pt-[15px] capitalize text-primary-1A162E'>
              Nhập lại mật khẩu
            </p>
            <Input
              className='relative w-[80%] flex-grow'
              register={register}
              name='confirm_password'
              type='password'
              placeholder='Nhập lại mật khẩu'
              errorMessage={errors.confirm_password?.message}
            />
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-[20%] truncate pt-[15px] capitalize text-primary-1A162E' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                className='bg-orange hover:bg-orange/80 flex h-9 items-center rounded-sm px-5 text-center text-sm text-white'
                type='submit'>
                Lưu
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  )
}
