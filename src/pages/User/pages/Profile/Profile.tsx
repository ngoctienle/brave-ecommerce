import { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation('general')

  return (
    <Fragment>
      <div className='mt-5 flex flex-col gap-3 md:mt-6'>
        <p className='fs-14 font-semibold capitalize text-primary-1A162E md:fs-16'>
          {t('general:name')}
        </p>
        <Input
          register={register}
          name='name'
          placeholder={t('general:name') as string}
          errorMessage={errors.name?.message}
        />
      </div>
      <div className='flex flex-col gap-2 md:gap-3'>
        <p className='fs-14 font-semibold capitalize text-primary-1A162E md:fs-16'>
          {t('general:phone')}
        </p>
        <Controller
          control={control}
          name='phone'
          render={({ field }) => (
            <InputNumber
              placeholder={t('general:phone') as string}
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
  const { t } = useTranslation('general')
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
      <Helmet>
        <title>Brave Ecommerce | {t('general:my-profile')}</title>
        <meta name='description' content='Helmet application' />
      </Helmet>
      <div className='border-b border-t border-t-secondary-EDEDF6 border-b-secondary-EDEDF6 p-3 md:py-4 md:px-6 mmd:border-t-0 mmd:border-l mmd:border-l-secondary-EDEDF6'>
        <h1 className='fs-16 font-bold capitalize text-primary-1A162E md:fs-18'>
          {t('general:my-profile')}
        </h1>
        <p className='fs-14 text-secondary-9E9DA8'>{t('general:profile-desc')}</p>
      </div>
      <div className='p-3 md:py-4 md:px-6 mmd:border-l'>
        <FormProvider {...methods}>
          <form
            className='flex flex-col-reverse gap-4 md:flex-row md:items-start md:gap-6'
            onSubmit={onSubmit}>
            <div className='flex-grow'>
              <div className='flex flex-col gap-2 md:gap-3'>
                <p className='fs-14 truncate font-semibold capitalize text-primary-1A162E md:fs-16'>
                  {t('general:email')}
                </p>
                <div className='fs-14 flex h-10 w-full cursor-not-allowed items-center rounded-10 border border-secondary-D2D1D6 bg-secondary-F8F8FB px-3 text-secondary-D2D1D6 md:fs-16 md:h-12 md:px-4'>
                  {profile?.email}
                </div>
              </div>
              <Info />
              <div className='flex flex-col gap-3'>
                <p className='fs-14 font-semibold capitalize text-primary-1A162E md:fs-16'>
                  {t('general:address')}
                </p>
                <Input
                  register={register}
                  name='address'
                  placeholder={t('general:address') as string}
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
              <div className='mt-1 flex flex-col'>
                <Button
                  className='fs-14 flex h-10 min-w-[80px] items-center justify-center rounded-10 bg-primary-67B044 px-5 text-white transition-colors hover:border-primary-1A162E sm:ml-auto md:fs-16 md:h-10 md:px-5'
                  type='submit'>
                  {t('general:save')}
                </Button>
              </div>
            </div>

            <div className='flex flex-col items-center mmd:w-[250px]'>
              <div className='my-4 h-24 w-24 md:my-5'>
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
              <div className='fs-12 mt-3 text-secondary-9E9DA8 md:fs-14'>
                <p>
                  {t('general:max-weight')} <span className='font-semibold'>1 MB</span>
                </p>
                <p>
                  {t('general:format')}: <span className='font-semibold'>.JPEG, .PNG</span>
                </p>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </Fragment>
  )
}
