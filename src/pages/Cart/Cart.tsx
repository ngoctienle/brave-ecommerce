import React, { Fragment, useContext, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, useLocation } from 'react-router-dom'

import { toast } from 'react-toastify'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'

import { AppContext } from 'src/contexts/app.context'
import { purchaseStatus } from 'src/constants/purchase'
import { convertToEN, formatCurrency, generateNameId } from 'src/utils/utils'
import paths from 'src/constants/paths'

import { Purchase } from 'src/types/purchase.type'
import purchaseApi from 'src/apis/purchase.api'

import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'

export default function Cart() {
  const { extendedPurchase, setExtendedPurchase } = useContext(AppContext)
  const { t, i18n } = useTranslation('product')
  const currentLanguage = i18n.language

  const location = useLocation()
  const choosenPurchaseIdFromLocation = (location.state as { purchaseId: string } | null)
    ?.purchaseId
  const { data: purchaseInCartData, refetch } = useQuery({
    queryKey: ['purchase', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchaseList({ status: purchaseStatus.inCart })
  })

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.purchaseUpdate,
    onSuccess: () => {
      refetch()
    }
  })

  const buyProductMutation = useMutation({
    mutationFn: purchaseApi.purchaseProduct,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message)
    }
  })

  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.purchaseDelete,
    onSuccess: () => {
      refetch()
    }
  })

  const purchaseListInCart = purchaseInCartData?.data.data
  const isAllChecked = useMemo(
    () => extendedPurchase.every((purchase) => purchase.checked),
    [extendedPurchase]
  )
  const isListPurchaseChecked = useMemo(
    () => extendedPurchase.filter((purchase) => purchase.checked),
    [extendedPurchase]
  )
  const countChecked = isListPurchaseChecked.length

  const totalPriceChecked = useMemo(
    () =>
      isListPurchaseChecked.reduce((result, current) => {
        return result + current.product.price * current.buy_count
      }, 0),
    [isListPurchaseChecked]
  )

  const totalDiscountChecked = useMemo(
    () =>
      isListPurchaseChecked.reduce((result, current) => {
        return (
          result +
          (current.product.price_before_discount - current.product.price) * current.buy_count
        )
      }, 0),
    [isListPurchaseChecked]
  )

  useEffect(() => {
    setExtendedPurchase((prev) => {
      const extendedPurchaseObj = keyBy(prev, '_id')
      return (
        purchaseListInCart?.map((purchase) => {
          const isChoosenPurchaseFromLocation = choosenPurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked:
              isChoosenPurchaseFromLocation || Boolean(extendedPurchaseObj[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchaseListInCart, choosenPurchaseIdFromLocation, setExtendedPurchase])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const handleChecked = (purchaseIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchase(
      produce((draft) => {
        draft[purchaseIndex].checked = e.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchase((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  const handleQuantity = (purchaseIndex: number, value: number, enabled: boolean) => {
    if (enabled) {
      const purchase = extendedPurchase[purchaseIndex]
      setExtendedPurchase(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({
        product_id: purchase.product._id,
        buy_count: value
      })
    }
  }

  const handleTypeQuantiy = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchase(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchase[purchaseIndex]._id
    deletePurchaseMutation.mutate([purchaseId])
  }

  const handleDeleteMulti = () => {
    const purchaseListId = isListPurchaseChecked.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchaseListId)
  }

  const handleBuyProduct = () => {
    if (isListPurchaseChecked.length > 0) {
      const body = isListPurchaseChecked.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductMutation.mutate(body)
    }
  }

  return (
    <Fragment>
      <Helmet>
        <title>Brave Ecommerce | Cart</title>
        <meta name='description' content='Helmet application' />
      </Helmet>
      <div className='bg-white py-4 lg:py-6'>
        <div className='container'>
          <div className='overflow-x-auto'>
            <div className='min-w-[992px]'>
              <div className='grid grid-cols-12 rounded-tl-10 rounded-tr-10 border border-secondary-EDEDF6 bg-FAFAFD p-2 lg:p-4'>
                <div className='col-span-6'>
                  <div className='flex items-center'>
                    <div className='mr-2 flex flex-shrink-0 items-center justify-center lg:mr-3'>
                      <input
                        type='checkbox'
                        className='h-3 w-3 accent-primary-FFB700 lg:h-4 lg:w-4'
                        checked={extendedPurchase.length > 0 ? isAllChecked : false}
                        onChange={handleCheckAll}
                      />
                    </div>
                    <p className='fs-14 flex-grow font-semibold capitalize text-primary-1A162E lg:fs-16'>
                      {t('product:pd')}
                    </p>
                  </div>
                </div>
                <div className='col-span-6'>
                  <div className='grid grid-cols-5 text-center'>
                    <p className='fs-14 col-span-2 font-semibold capitalize text-primary-1A162E lg:fs-16'>
                      {t('product:u-price')}
                    </p>
                    <p className='fs-14 col-span-1 font-semibold capitalize text-primary-1A162E lg:fs-16'>
                      {t('product:txt-qty')}
                    </p>
                    <p className='fs-14 col-span-1 font-semibold capitalize text-primary-1A162E lg:fs-16'>
                      {t('product:total-price')}
                    </p>
                    <p className='fs-14 col-span-1 font-semibold capitalize text-primary-1A162E lg:fs-16'>
                      {t('product:action')}
                    </p>
                  </div>
                </div>
              </div>
              {extendedPurchase.length > 0 && (
                <div className='my-2 border border-secondary-EDEDF6 bg-FAFAFD p-2 lg:my-4 lg:p-4'>
                  {extendedPurchase.map((purchase, index) => (
                    <div
                      className='mt-2 grid grid-cols-12 items-center border-b border-b-secondary-EDEDF6 pb-2 first:mt-0 last:border-none last:pb-0 lg:mt-4 lg:pb-4'
                      key={purchase._id}>
                      <div className='col-span-6'>
                        <div className='flex'>
                          <div className='mr-2 flex flex-shrink-0 items-center justify-center lg:mr-3'>
                            <input
                              type='checkbox'
                              className='h-3 w-3 accent-primary-FFB700 lg:h-4 lg:w-4'
                              checked={purchase.checked}
                              onChange={handleChecked(index)}
                            />
                          </div>
                          <div className='flex-grow'>
                            <div className='flex items-center'>
                              <Link
                                className='mr-2 h-16 w-16 flex-shrink-0 lg:mr-3 lg:h-20 lg:w-20'
                                to={`${paths.home}${generateNameId({
                                  name: purchase.product.name,
                                  id: purchase.product._id
                                })}`}>
                                <img
                                  alt={
                                    currentLanguage === 'vi'
                                      ? purchase.product.name
                                      : convertToEN(purchase.product.name)
                                  }
                                  title={
                                    currentLanguage === 'vi'
                                      ? purchase.product.name
                                      : convertToEN(purchase.product.name)
                                  }
                                  src={purchase.product.image}
                                />
                              </Link>
                              <div className='flex-grow'>
                                <Link
                                  to={`${paths.home}${generateNameId({
                                    name: purchase.product.name,
                                    id: purchase.product._id
                                  })}`}
                                  className='fs-14 text-left capitalize text-primary-1A162E line-clamp-2 lg:fs-16'>
                                  {currentLanguage === 'vi'
                                    ? purchase.product.name
                                    : convertToEN(purchase.product.name)}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-span-6'>
                        <div className='grid grid-cols-5 items-center'>
                          <div className='col-span-2'>
                            <div className='flex items-center justify-center'>
                              <span className='fs-14 text-primary-F94545/30 line-through lg:fs-16'>
                                ₫{formatCurrency(purchase.product.price_before_discount)}
                              </span>
                              <span className='fs-14 ml-2 text-primary-1A162E lg:fs-16 lg:ml-3'>
                                ₫{formatCurrency(purchase.product.price)}
                              </span>
                            </div>
                          </div>
                          <div className='col-span-1'>
                            <QuantityController
                              max={purchase.product.quantity}
                              value={purchase.buy_count}
                              classNameWrapper='justify-center'
                              onIncrease={(value) =>
                                handleQuantity(index, value, value <= purchase.product.quantity)
                              }
                              onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                              onTyping={handleTypeQuantiy(index)}
                              onFocusOut={(value) =>
                                handleQuantity(
                                  index,
                                  value,
                                  value >= 1 &&
                                    value <= purchase.product.quantity &&
                                    value !== (purchaseListInCart as Purchase[])[index].buy_count
                                )
                              }
                              disabled={purchase.disabled}
                            />
                          </div>
                          <div className='col-span-1'>
                            <p className='fs-14 text-center text-primary-67B044 lg:fs-16'>
                              ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                            </p>
                          </div>
                          <div className='col-span-1'>
                            <button
                              onClick={handleDelete(index)}
                              className='fs-12 w-full bg-none text-primary-F94545 transition-colors hover:underline lg:fs-14'>
                              {t('product:delete')}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* <div className='text-center'>
          <img src='' alt='no purchase' className='mx-auto h-24 w-24' />
          <div className='mt-5 font-bold text-gray-400'>Giỏ hàng của bạn còn trống</div>
          <div className='mt-5 text-center'>
            <Link
              to={paths.home}
              className=' rounded-sm bg-orange px-10 py-2  uppercase text-white transition-all hover:bg-orange/80'
            >
              Mua ngay
            </Link>
          </div>
        </div> */}
          <div className='sticky bottom-0 z-10 flex flex-col items-end rounded-bl-10 rounded-br-10 border border-secondary-EDEDF6 bg-FAFAFD p-2 md:flex-row md:items-center md:justify-between lg:p-4'>
            <div className='flex items-center'>
              <div className='flex flex-shrink-0 items-center justify-center pr-2 lg:pr-3'>
                <input
                  type='checkbox'
                  className='h-3 w-3 accent-primary-FFB700 lg:h-4 lg:w-4'
                  checked={extendedPurchase.length > 0 ? isAllChecked : false}
                  onChange={handleCheckAll}
                />
              </div>
              <button className='mx-2 border-none bg-none lg:mx-3' onClick={handleCheckAll}>
                {t('product:select-all')} ({extendedPurchase.length})
              </button>
              <button className='mx-2 border-none bg-none lg:mx-3' onClick={handleDeleteMulti}>
                {t('product:delete')}
              </button>
            </div>
            <div className='mt-2 flex flex-col items-center md:mt-0 md:flex-row'>
              <div className='mr-0 md:mr-6'>
                <div className='flex items-center justify-end'>
                  <p className='fs-14 font-semibold text-primary-1A162E lg:fs-16'>
                    {t('product:total-payment')} ({countChecked} {t('product:pd')}):
                  </p>
                  <p className='fs-18 ml-2 text-primary-67B044 lg:fs-20'>
                    ₫{formatCurrency(totalPriceChecked)}
                  </p>
                </div>
                <div className='flex items-center justify-end'>
                  <div className='fs-14 font-semibold text-primary-1A162E'>
                    {t('product:saving')}:
                  </div>
                  <div className='ml-3 text-primary-F94545/40 lg:ml-6'>
                    ₫{formatCurrency(totalDiscountChecked)}
                  </div>
                </div>
              </div>
              <Button
                className='mt-2 h-10 w-full rounded-8 bg-primary-FFB700 px-4 md:mt-0 md:max-w-max lg:h-[50px]'
                onClick={handleBuyProduct}
                disabled={buyProductMutation.isLoading}>
                {t('product:buy')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
