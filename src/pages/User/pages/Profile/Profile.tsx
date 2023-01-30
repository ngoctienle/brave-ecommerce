import { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { UserIcon } from '@heroicons/react/24/outline'

import { AppContext } from 'src/contexts/app.context'
import { UserSchema, userSchema } from 'src/utils/rules'
import { setUserProfileToLS } from 'src/utils/auth'
import { getAvatarUrl, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'
import userApi from 'src/apis/user.api'

import Button from 'src/components/Button'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import InputFile from 'src/components/InputFile'

import DataSelect from '../../components/DataSelect'

type FormData = Pick<UserSchema, 'name' | 'address' | 'date_of_birth' | 'avatar' | 'phone'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}
const profileSchema = userSchema.pick(['name', 'address', 'date_of_birth', 'avatar', 'phone'])

function Info() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormData>()
  return (
    <Fragment>
      <div className='mt-6 flex flex-col sm:flex-row'>
        <p className='w-[20%] truncate pt-[15px] capitalize text-primary-1A162E'>Tên</p>
        <Input
          className='w-80% flex-grow'
          register={register}
          name='name'
          placeholder='Họ và tên'
          errorMessage={errors.name?.message}
        />
      </div>
      <div className='flex flex-col flex-wrap sm:flex-row'>
        <p className='w-[20%] truncate pt-[15px] capitalize text-primary-1A162E'>Số điện thoại</p>
        <Controller
          control={control}
          name='phone'
          render={({ field }) => (
            <InputNumber
              className='w-80% flex-grow'
              placeholder='Số điện thoại'
              errorMessage={errors.phone?.message}
              {...field}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </Fragment>
  )
}

export default function Profile() {
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
  } = methods

  const { setUserProfile } = useContext(AppContext)
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data
  const updateProfileMutation = useMutation(userApi.updateProfile)
  const uploadAvatarMutation = useMutation(userApi.uploadAvatar)

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('avatar', profile.avatar)
      setValue('address', profile.address)
      setValue(
        'date_of_birth',
        profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1)
      )
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadAvatarRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadAvatarRes.data.data
        setValue('avatar', avatarName)
      }

      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      refetch()
      toast.success(res.data.message)
      setUserProfile(res.data.data)
      setUserProfileToLS(res.data.data)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorRespone<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })
  const avatar = watch('avatar')

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  return (
    <Fragment>
      <div className='border-b border-l border-b-secondary-EDEDF6 border-l-secondary-EDEDF6 py-4 px-6'>
        <h1 className='fs-18 font-bold capitalize text-primary-1A162E'>Hồ Sơ Của Tôi</h1>
        <p className='fs-14 text-secondary-9E9DA8'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <div className='border-l border-b-secondary-EDEDF6 py-4 px-6'>
        <FormProvider {...methods}>
          <form
            className='flex flex-col-reverse gap-6 md:flex-row md:items-start'
            onSubmit={onSubmit}>
            <div className='mt-6 flex-grow md:mt-0'>
              <div className='flex flex-col flex-wrap items-center sm:flex-row'>
                <p className='w-[20%] truncate capitalize text-primary-1A162E'>Email</p>
                <div className='w-80% fs-14 flex h-10 flex-grow cursor-not-allowed items-center rounded-10 border border-secondary-D2D1D6 bg-secondary-F8F8FB px-3 text-secondary-D2D1D6 sm:w-[80%] md:fs-16 md:h-12 md:px-4'>
                  {profile?.email}
                </div>
              </div>
              <Info />
              <div className='flex flex-col flex-wrap sm:flex-row'>
                <p className='w-[20%] truncate pt-[15px] capitalize text-primary-1A162E'>Địa chỉ</p>
                <Input
                  className='w-[80%] flex-grow'
                  register={register}
                  name='address'
                  placeholder='Địa chỉ'
                  errorMessage={errors.address?.message}
                />
              </div>
              <Controller
                control={control}
                name='date_of_birth'
                render={({ field }) => (
                  <DataSelect
                    errorMessage={errors.date_of_birth?.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
                <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
                <div className='sm:w-[80%] sm:pl-5'>
                  <Button
                    className='bg-orange hover:bg-orange/80 flex h-9 items-center rounded-sm px-5 text-center'
                    type='submit'>
                    Lưu
                  </Button>
                </div>
              </div>
            </div>
            <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
              <div className='flex flex-col items-center'>
                <div className='my-5 h-24 w-24'>
                  {!avatar ? (
                    <UserIcon />
                  ) : (
                    <img
                      src={previewImage || getAvatarUrl(avatar)}
                      alt=''
                      className='h-full w-full rounded-full object-cover'
                    />
                  )}
                </div>
                <InputFile onChange={handleChangeFile} />
                <div className='mt-3 text-gray-400'>
                  <div>Dụng lượng file tối đa 1 MB</div>
                  <div>Định dạng: .JPEG, .PNG</div>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </Fragment>
  )
}
