import { Fragment, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import omit from 'lodash/omit'
import cls from 'classnames'
import {
  LanguageIcon,
  UserIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

import { AppContext } from 'src/contexts/app.context'
import { Schema, schema } from 'src/utils/rules'
import { convertToEN, formatCurrency, generateNameId, getAvatarUrl } from 'src/utils/utils'
import { purchaseStatus } from 'src/constants/purchase'
import paths from 'src/constants/paths'

import authApi from 'src/apis/auth.api'
import purchaseApi from 'src/apis/purchase.api'
import useQueryConfig from 'src/hooks/useQueryConfig'

import Brand from 'src/components/Brand'
import Popover from 'src/components/Popover'

type FormData = Pick<Schema, 'name'>

const nameSchema = schema.pick(['name'])
const MAX_PRODUCT = 5

export default function Header() {
  const { setIsAuthenticated, isAuthenticated, setUserProfile, userProfile } =
    useContext(AppContext)
  const { t, i18n } = useTranslation(['home', 'general'])
  const currentLanguage = i18n.language

  const queryConfig = useQueryConfig()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const { register: registerMobile, handleSubmit: handleSubmitMobile } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })

  const logoutMutation = useMutation({
    mutationFn: authApi.LogoutAccount,
    onSuccess: () => {
      setIsAuthenticated(false)
      setUserProfile(null)
      queryClient.removeQueries({ queryKey: ['purchase', { status: purchaseStatus.inCart }] })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const handleSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }

    navigate({
      pathname: paths.home,
      search: createSearchParams(config).toString()
    })
  })

  const handleSearchMobile = handleSubmitMobile((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }

    navigate({
      pathname: paths.home,
      search: createSearchParams(config).toString()
    })
  })

  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchase', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchaseList({ status: purchaseStatus.inCart }),
    enabled: isAuthenticated
  })

  const purchaseListInCart = purchaseInCartData?.data.data

  const changeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
  }

  return (
    <Fragment>
      <header className='bg-FAFAFD py-4 font-brave-ecom lg:py-5'>
        <div className='container'>
          <div className='grid grid-cols-12'>
            <Link to='/' className='col-span-6 flex max-w-max items-center md:col-span-3'>
              <Brand />
            </Link>

            <div className='col-span-6 flex items-center justify-end gap-3 md:col-span-9 md:gap-5'>
              {/* Form Search Desktop*/}
              <form
                className='hidden h-9 w-[400px] items-center overflow-hidden rounded-8 border border-secondary-EDEDF6 bg-white px-4 transition-colors focus-within:border-secondary-9E9DA8 md:flex lg:h-10'
                onSubmit={handleSearch}>
                <input
                  type='text'
                  placeholder={t('header.search-placeholder') as string}
                  className='flex-grow border-none bg-transparent text-primary-1A162E outline-none placeholder:fs-14 placeholder:text-primary-1A162E/70'
                  {...register('name')}
                />
                <button className='flex-shrink-0 rounded-8'>
                  <MagnifyingGlassIcon className='h-5 w-5 lg:h-6 lg:w-6' />
                </button>
              </form>
              {/* End Form Search */}

              {/* Cart */}
              <Popover
                renderPopover={
                  <div className='flex w-[250px] flex-col rounded-8 bg-white p-3 shadow-lg md:w-[400px] lg:rounded-16'>
                    <div className='flex items-center justify-between border-b border-secondary-EDEDF6 pb-2'>
                      <span className='fs-14 font-semibold capitalize text-primary-1A162E lg:fs-16'>
                        {t('header.cart-icon-title')}
                      </span>
                      <Link
                        to={paths.cart}
                        className='fs-12 cursor-pointer capitalize text-primary-0071DC hover:underline lg:fs-14'>
                        {t('header.view-cart')}
                      </Link>
                    </div>
                    {purchaseListInCart
                      ? purchaseListInCart.slice(0, MAX_PRODUCT).map((purchase) => (
                          <Link
                            to={`${paths.home}${generateNameId({
                              name: purchase.product.name,
                              id: purchase.product._id
                            })}`}
                            className='mt-2 flex items-center gap-2 rounded-8 p-2 hover:bg-secondary-F8F8FB/60 lg:p-3'
                            key={purchase._id}>
                            <img
                              src={purchase.product.image}
                              title={
                                currentLanguage === 'vi'
                                  ? purchase.product.name
                                  : convertToEN(purchase.product.name)
                              }
                              alt={
                                currentLanguage === 'vi'
                                  ? purchase.product.name
                                  : convertToEN(purchase.product.name)
                              }
                              className='h-8 w-8 object-cover lg:h-10 lg:w-10'
                            />
                            <div className='flex-grow overflow-hidden'>
                              <p className='fs-14 truncate capitalize text-primary-1A162E lg:fs-16'>
                                {currentLanguage === 'vi'
                                  ? purchase.product.name
                                  : convertToEN(purchase.product.name)}
                              </p>
                            </div>
                            <div className='flex-shrink-0'>
                              <span className='fs-14 text-secondary-77DAE6 lg:fs-16'>
                                {formatCurrency(purchase.product.price)}
                              </span>
                            </div>
                          </Link>
                        ))
                      : ''}
                  </div>
                }>
                <div className='relative h-8 w-8 cursor-pointer rounded-8 border border-secondary-EDEDF6 bg-white transition-colors hover:border-secondary-9E9DA8 md:h-9 md:w-9 lg:h-10 lg:w-10'>
                  <ShoppingCartIcon className='absolute top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-primary-1A162E lg:h-6 lg:w-6' />
                  {purchaseListInCart && purchaseListInCart.length > 0 && (
                    <span className='fs-9 absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-secondary-77DAE6'>
                      {purchaseListInCart.length}
                    </span>
                  )}
                </div>
              </Popover>
              {/* End Cart */}

              {/* Language */}
              <Popover
                className='flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-8 border border-secondary-EDEDF6 bg-white transition-colors hover:border-secondary-9E9DA8 md:h-9 md:w-9 lg:h-10 lg:w-10'
                renderPopover={
                  <div className='flex flex-col rounded-8 bg-white p-2 shadow-lg lg:rounded-16 lg:p-3'>
                    <button
                      onClick={() => changeLanguage('vi')}
                      className={cls(
                        'fs-14 rounded-8 py-2 px-4  transition-colors hover:bg-secondary-F8F8FB/60 hover:text-secondary-77DAE6 lg:fs-16 lg:py-3 lg:px-6',
                        {
                          'text-secondary-77DAE6': currentLanguage === 'vi',
                          'text-primary-1A162E': currentLanguage === 'vi'
                        }
                      )}>
                      {t('header.lng-vi')}
                    </button>
                    <button
                      onClick={() => changeLanguage('en')}
                      className={cls(
                        'fs-14 rounded-8 py-2 px-4  transition-colors hover:bg-secondary-F8F8FB/60 hover:text-secondary-77DAE6 lg:fs-16 lg:py-3 lg:px-6',
                        {
                          'text-secondary-77DAE6': currentLanguage === 'en',
                          'text-primary-1A162E': currentLanguage === 'en'
                        }
                      )}>
                      {t('header.lng-en')}
                    </button>
                  </div>
                }>
                <LanguageIcon className='h-5 w-5 text-primary-1A162E lg:h-6 lg:w-6' />
              </Popover>
              {/* End Language */}

              {/* Auth */}
              {isAuthenticated && (
                <Popover
                  className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-8 border border-secondary-EDEDF6 bg-white transition-colors hover:border-secondary-9E9DA8 md:h-9 md:w-9 lg:h-10 lg:w-10'
                  renderPopover={
                    <div className='flex flex-col rounded-8 bg-white p-2 shadow-lg lg:rounded-16 lg:p-3'>
                      <Link
                        className='fs-14 rounded-8 py-2 px-4 text-left text-primary-1A162E transition-colors hover:bg-secondary-F8F8FB/60 hover:text-secondary-77DAE6 lg:fs-16 lg:py-3 lg:px-6'
                        to={paths.profile}>
                        {t('general:my-account')}
                      </Link>
                      <Link
                        className='fs-14 rounded-8 py-2 px-4 text-left text-primary-1A162E transition-colors hover:bg-secondary-F8F8FB/60 hover:text-secondary-77DAE6 lg:fs-16 lg:py-3 lg:px-6'
                        to={paths.historyPurchase}>
                        {t('general:purchases-history')}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className='fs-14 rounded-8 py-2 px-4 text-left text-primary-1A162E transition-colors hover:bg-secondary-F8F8FB/60 hover:text-secondary-77DAE6 lg:fs-16 lg:py-3 lg:px-6'>
                        {t('general:sign-out')}
                      </button>
                    </div>
                  }>
                  <div className='h-5 w-5 flex-shrink-0 lg:h-6 lg:w-6'>
                    {userProfile?.avatar ? (
                      <img
                        src={getAvatarUrl(userProfile.avatar)}
                        alt={userProfile.email}
                        title={userProfile.email}
                        className='h-full w-full object-cover'
                      />
                    ) : (
                      <UserIcon className='h-full w-full object-cover text-primary-1A162E' />
                    )}
                  </div>
                  {/* <span className='fs-14 text-primary-1A162E transition-colors hover:text-primary-1A162E/70'>
                  {userProfile?.email}
                </span> */}
                </Popover>
              )}
              {!isAuthenticated && (
                <Link
                  to={paths.login}
                  className='fs-14 flex h-8 items-center whitespace-nowrap rounded-8 border border-secondary-EDEDF6 bg-white px-2 text-center capitalize text-primary-1A162E transition-colors hover:border-secondary-9E9DA8 md:h-9 lg:fs-16 lg:h-10 lg:px-4'>
                  {t('general:sign-in')}
                </Link>
              )}
              {/* End Auth */}
            </div>
          </div>
        </div>
      </header>
      {/* Form Search Mobile */}
      <div className='container'>
        <div className='mx-auto mt-4 block md:mt-0 md:hidden'>
          <form
            className='flex h-9 items-center overflow-hidden rounded-8 border border-secondary-EDEDF6 bg-white px-3 py-2 transition-colors focus-within:border-secondary-9E9DA8 lg:h-10 lg:px-4'
            onSubmit={handleSearchMobile}>
            <input
              type='text'
              placeholder={t('header.search-placeholder') as string}
              className='flex-grow border-none bg-transparent text-primary-1A162E outline-none placeholder:fs-14 placeholder:text-primary-1A162E/70'
              {...registerMobile('name')}
            />
            <button className='flex-shrink-0 rounded-8'>
              <MagnifyingGlassIcon className='h-5 w-5 lg:h-6 lg:w-6' />
            </button>
          </form>
        </div>
      </div>
      {/* End Form Search Mobile */}
    </Fragment>
  )
}
