import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'

import { Product as ProductType, ProductListConfig } from 'src/types/product.type'
import { purchaseStatus } from 'src/constants/purchase'
import productApi from 'src/apis/product.api'
import purchaseApi from 'src/apis/purchase.api'

import {
  calculateRateSale,
  formatCurrency,
  formatNumberToSocialStyle,
  getIdFromNameId
} from 'src/utils/utils'

import ProductRating from 'src/components/ProductRating'
import Product from '../ProductList/components/Product'
import QuantityController from 'src/components/QuantityController'
import { toast } from 'react-toastify'

export default function ProductDetail() {
  const [curIndexImage, setCurIndexImage] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const [buyCount, setBuyCount] = useState(1)

  const imgRef = useRef<HTMLImageElement>(null)

  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })

  const productDetail = productDetailData?.data.data
  const curImage = useMemo(
    () => (productDetail ? productDetail.images.slice(...curIndexImage) : []),
    [productDetail, curIndexImage]
  )

  const queryConfig: ProductListConfig = {
    limit: '3',
    page: '1',
    category: productDetail?.category._id
  }
  const { data: productsRelativeData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProductList(queryConfig)
    },
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(productDetail)
  })

  const addToCartMutation = useMutation(purchaseApi.addToCart)

  useEffect(() => {
    if (productDetail && productDetail.images.length > 0) {
      setActiveImage(productDetail.images[0])
    }
  }, [productDetail])

  const hoverActive = (img: string) => {
    setActiveImage(img)
  }

  const nextSlide = () => {
    if (curIndexImage[1] < (productDetail as ProductType)?.images.length) {
      setCurIndexImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prevSlide = () => {
    if (curIndexImage[0] > 0) {
      setCurIndexImage((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const img = imgRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = img
    const { offsetY, offsetX } = e.nativeEvent
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)

    img.style.width = naturalWidth + 'px'
    img.style.height = naturalHeight + 'px'
    img.style.maxWidth = 'unset'
    img.style.top = top + 'px'
    img.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imgRef.current?.removeAttribute('style')
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const queryClient = useQueryClient()
  const addToCart = () => {
    addToCartMutation.mutate(
      { buy_count: buyCount, product_id: productDetail?._id as string },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, { autoClose: 1200 })
          queryClient.invalidateQueries({
            queryKey: ['purchase', { status: purchaseStatus.inCart }]
          })
        }
      }
    )
  }

  if (!productDetail) return null

  return (
    <div className='py-4 lg:py-6'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-6 rounded-16 border border-secondary-EDEDF6 bg-FAFAFD p-4 md:grid-cols-12 md:gap-8 lg:p-6'>
          <div className='md:col-span-5'>
            <div
              className='b-sd relative w-full cursor-zoom-in overflow-hidden rounded-10 pt-[100%]'
              onMouseMove={handleZoom}
              onMouseLeave={handleRemoveZoom}>
              <img
                src={activeImage}
                alt={productDetail.name}
                title={productDetail.name}
                ref={imgRef}
                className='pointer-events-none absolute top-0 left-0 h-full w-full bg-white object-cover'
              />
            </div>
            <div className='relative mt-4 grid grid-cols-5 gap-2 md:gap-3 lg:mt-6'>
              <button
                className='absolute -left-4 top-1/2 h-4 w-4 -translate-y-1/2 bg-transparent md:-left-5'
                onClick={prevSlide}>
                <img src='/assets/icon-arrow-left-light.svg' title='' alt='' className='h-4 w-4' />
              </button>
              {curImage.map((img) => {
                const isActive = img === activeImage
                return (
                  <div
                    className='z-1 relative w-full overflow-hidden rounded-8 pt-[100%]'
                    key={img}
                    onMouseEnter={() => hoverActive(img)}>
                    <img
                      src={img}
                      alt={productDetail.name}
                      title={productDetail.name}
                      className='absolute top-0 left-0 h-full w-full bg-white object-cover'
                    />
                    {isActive && (
                      <div className='absolute inset-0 rounded-8 border border-primary-FFB700'></div>
                    )}
                  </div>
                )
              })}
              <button
                className='absolute -right-4 top-1/2 h-4 w-4 -translate-y-1/2 bg-transparent md:-right-5'
                onClick={nextSlide}>
                <img src='/assets/icon-arrow-right-light.svg' title='' alt='' className='h-4 w-4' />
              </button>
            </div>
          </div>
          <div className='md:col-span-7'>
            <h1 className='fs-18 font-semibold uppercase text-primary-1A162E lg:fs-20'>
              {productDetail.name}
            </h1>
            <div className='mt-2 flex items-center gap-2 lg:mt-4 lg:gap-4'>
              <div className='flex items-center gap-1'>
                <span className='fs-14 border-b border-b-primary-FFB700 text-primary-FFB700'>
                  {productDetail.rating}
                </span>
                <ProductRating rating={productDetail.rating} />
              </div>
              <div className='h-4 border-r-[1px] border-r-primary-FFB700'></div>
              <p className='fs-14 text-primary-FFB700'>
                <span>{formatNumberToSocialStyle(productDetail.sold)}</span>
                <span className='ml-1'>Đã bán</span>
              </p>
            </div>
            <div className='mt-3 flex max-w-max items-center rounded-10 border border-secondary-EDEDF6 bg-white p-2 lg:mt-6'>
              <p className='fs-14 max-w-[50%] truncate text-primary-F94545/70 line-through'>
                <span>₫</span>
                <span>{formatCurrency(productDetail.price_before_discount)}</span>
              </p>
              <p className='fs-14 ml-2 max-w-[50%] truncate text-primary-1A162E'>
                <span>₫</span>
                <span>{formatCurrency(productDetail.price)}</span>
              </p>
              <p className='fs-12 ml-4 rounded-8 bg-primary-67B044 p-2 font-semibold'>
                {calculateRateSale(productDetail.price_before_discount, productDetail.price)}
              </p>
            </div>
            <div className='xsx:flex-nowrap xsx:gap-5 mt-4 flex flex-wrap items-center gap-4 lg:mt-8'>
              <p className='fs-14 whitespace-nowrap capitalize text-primary-1A162E md:fs-16'>
                số lượng
              </p>
              <QuantityController
                onDecrease={handleBuyCount}
                onIncrease={handleBuyCount}
                onTyping={handleBuyCount}
                value={buyCount}
                max={productDetail.quantity}
              />
              <p className='fs-14 whitespace-nowrap text-primary-1A162E'>
                {productDetail.quantity} Sản phẩm có sẵn
              </p>
            </div>
            <div className='xsx:flex-nowrap xsx:justify-end mt-4 flex flex-wrap items-end justify-start gap-4 lg:mt-8 lg:gap-5'>
              <button
                onClick={addToCart}
                className='xsx:max-w-max h-10 whitespace-nowrap rounded-8 bg-primary-FFB700 px-4'>
                Thêm vào giỏ hàng
              </button>
              <button className='xsx:max-w-max h-10 whitespace-nowrap rounded-8 border border-primary-FFB700 bg-transparent px-4'>
                Đi đến thanh toán
              </button>
            </div>
          </div>
        </div>
        <div className='mt-3 rounded-16 border border-secondary-EDEDF6 bg-FAFAFD p-4 lg:mt-6 lg:p-6'>
          <h2 className='fs-18 mb-2 font-semibold uppercase text-primary-1A162E lg:fs-20 lg:mb-4'>
            chi tiết sản phẩm
          </h2>
          <div
            className='dcs-product fs-14 text-primary-1A162E lg:fs-16'
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(productDetail.description)
            }}></div>
        </div>
        {productsRelativeData && (
          <div className='mt-3 rounded-16 border border-secondary-EDEDF6 bg-FAFAFD p-4 lg:mt-6 lg:p-6'>
            <p className='fs-18 font-semibold uppercase text-primary-1A162E lg:fs-20'>
              Có Thể Bạn Sẽ Thích
            </p>
            <div className='mt-3 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mt-6 lg:gap-6'>
              {productsRelativeData.data.data.products.map((product) => (
                <div
                  className='b-sd col-span-1 overflow-hidden rounded-16 border border-secondary-EDEDF6 bg-white'
                  key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
