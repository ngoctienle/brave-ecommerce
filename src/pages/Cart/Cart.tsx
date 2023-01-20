import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { produce } from 'immer'

import paths from 'src/constants/paths'
import { purchaseStatus } from 'src/constants/purchase'
import { formatCurrency, generateNameId } from 'src/utils/utils'

import { Purchase } from 'src/types/purchase.type'
import purchaseApi from 'src/apis/purchase.api'

import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import { keyBy } from 'lodash'
import { toast } from 'react-toastify'

interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}

export default function Cart() {
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>([])

  const { data: purchaseInCartData, refetch } = useQuery({
    queryKey: ['purchase', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchaseList({ status: purchaseStatus.inCart })
  })
  const purchaseListInCart = purchaseInCartData?.data.data
  const isAllChecked = extendedPurchase.every((purchase) => purchase.checked)
  const isListPurchaseChecked = extendedPurchase.filter((purchase) => purchase.checked)
  const countChecked = isListPurchaseChecked.length

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

  const totalPriceChecked = isListPurchaseChecked.reduce((result, current) => {
    return result + current.product.price * current.buy_count
  }, 0)
  const totalDiscountChecked = isListPurchaseChecked.reduce((result, current) => {
    return (
      result + (current.product.price_before_discount - current.product.price) * current.buy_count
    )
  }, 0)

  useEffect(() => {
    setExtendedPurchase((prev) => {
      const extendedPurchaseObj = keyBy(prev, '_id')
      return (
        purchaseListInCart?.map((purchase) => ({
          ...purchase,
          disabled: false,
          checked: Boolean(extendedPurchaseObj[purchase._id]?.checked)
        })) || []
      )
    })
  }, [purchaseListInCart])

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
    <div className='bg-white py-6'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='grid grid-cols-12 rounded-tl-10 rounded-tr-10 border border-secondary-EDEDF6 bg-FAFAFD p-4'>
            <div className='col-span-6'>
              <div className='flex items-center'>
                <div className='mr-3 flex flex-shrink-0 items-center justify-center'>
                  <input
                    type='checkbox'
                    className='h-4 w-4 accent-primary-FFB700'
                    checked={extendedPurchase.length > 0 ? isAllChecked : false}
                    onChange={handleCheckAll}
                  />
                </div>
                <p className='fs-16 flex-grow font-semibold capitalize text-primary-1A162E'>
                  Sản phẩm
                </p>
              </div>
            </div>
            <div className='col-span-6'>
              <div className='grid grid-cols-5 text-center'>
                <p className='fs-16 col-span-2 font-semibold capitalize text-primary-1A162E'>
                  Đơn giá
                </p>
                <p className='fs-16 col-span-1 font-semibold capitalize text-primary-1A162E'>
                  Số lượng
                </p>
                <p className='fs-16 col-span-1 font-semibold capitalize text-primary-1A162E'>
                  Số tiền
                </p>
                <p className='fs-16 col-span-1 font-semibold capitalize text-primary-1A162E'>
                  Thao tác
                </p>
              </div>
            </div>
          </div>
          {extendedPurchase.length > 0 && (
            <div className='my-4 border border-secondary-EDEDF6 bg-FAFAFD p-4'>
              {extendedPurchase.map((purchase, index) => (
                <div
                  className='mt-4 grid grid-cols-12 items-center border-b border-b-secondary-EDEDF6 pb-4 first:mt-0 last:border-none'
                  key={purchase._id}>
                  <div className='col-span-6'>
                    <div className='flex'>
                      <div className='mr-3 flex flex-shrink-0 items-center justify-center'>
                        <input
                          type='checkbox'
                          className='h-4 w-4 accent-primary-FFB700'
                          checked={purchase.checked}
                          onChange={handleChecked(index)}
                        />
                      </div>
                      <div className='flex-grow'>
                        <div className='flex items-center'>
                          <Link
                            className='mr-3 h-20 w-20 flex-shrink-0'
                            to={`${paths.home}${generateNameId({
                              name: purchase.product.name,
                              id: purchase.product._id
                            })}`}>
                            <img
                              alt={purchase.product.name}
                              title={purchase.product.name}
                              src={purchase.product.image}
                            />
                          </Link>
                          <div className='flex-grow'>
                            <Link
                              to={`${paths.home}${generateNameId({
                                name: purchase.product.name,
                                id: purchase.product._id
                              })}`}
                              className='text-left line-clamp-2'>
                              {purchase.product.name}
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
                          <span className='fs-16 text-primary-F94545/30 line-through'>
                            ₫{formatCurrency(purchase.product.price_before_discount)}
                          </span>
                          <span className='fs-16 ml-3 text-primary-1A162E'>
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
                        <p className='fs-16 text-center text-primary-67B044'>
                          ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                        </p>
                      </div>
                      <div className='col-span-1'>
                        <button
                          onClick={handleDelete(index)}
                          className='fs-14 w-full bg-none text-primary-F94545 transition-colors hover:underline'>
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
        </div>
        <div className='sticky bottom-0 z-10 flex items-center rounded-bl-10 rounded-br-10 border border-secondary-EDEDF6 bg-FAFAFD p-4'>
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input
                type='checkbox'
                className='h-4 w-4 accent-primary-FFB700'
                checked={extendedPurchase.length > 0 ? isAllChecked : false}
                onChange={handleCheckAll}
              />
            </div>
            <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
              Chọn tất cả ({extendedPurchase.length})
            </button>
            <button className='mx-3 border-none bg-none' onClick={handleDeleteMulti}>
              Xóa
            </button>
          </div>
          <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
            <div className='mr-6'>
              <div className='flex items-center sm:justify-end'>
                <p className='fs-16 text-primary-1A162E'>
                  Tổng thanh toán ({countChecked} sản phẩm):
                </p>
                <p className='fs-20 ml-2 text-primary-67B044'>
                  ₫{formatCurrency(totalPriceChecked)}
                </p>
              </div>
              <div className='flex items-center text-sm sm:justify-end'>
                <div className='fs-14 text-primary-1A162E'>Tiết kiệm</div>
                <div className='ml-6 text-primary-F94545/40'>
                  ₫{formatCurrency(totalDiscountChecked)}
                </div>
              </div>
            </div>
            <Button
              className='h-[50px] max-w-max rounded-8 bg-primary-FFB700 px-4'
              onClick={handleBuyProduct}
              disabled={buyProductMutation.isLoading}>
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
