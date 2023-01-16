import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { Product } from 'src/types/product.type'
import productApi from 'src/apis/product.api'
import DOMPurify from 'dompurify'

import InputNumber from 'src/components/InputNumber'
import ProductRating from 'src/components/ProductRating'

import {
  calculateRateSale,
  formatCurrency,
  formatNumberToSocialStyle,
  getIdFromNameId
} from 'src/utils/utils'

export default function ProductDetail() {
  const [curIndexImage, setCurIndexImage] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')

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

  useEffect(() => {
    if (productDetail && productDetail.images.length > 0) {
      setActiveImage(productDetail.images[0])
    }
  }, [productDetail])

  const hoverActive = (img: string) => {
    setActiveImage(img)
  }

  const nextSlide = () => {
    if (curIndexImage[1] < (productDetail as Product)?.images.length) {
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

  if (!productDetail) return null

  return (
    <div className='py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-5'>
            <div className='rounded-16 border border-secondary-EDEDF6 bg-FAFAFD p-6'>
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
              <div className='relative mt-6 grid grid-cols-5 gap-3'>
                <button
                  className='absolute -left-5 top-1/2 h-4 w-4 -translate-y-1/2 bg-transparent'
                  onClick={prevSlide}>
                  <img
                    src='src/assets/icon-arrow-left-light.svg'
                    title=''
                    alt=''
                    className='h-4 w-4'
                  />
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
                  className='absolute -right-5 top-1/2 h-4 w-4 -translate-y-1/2 bg-transparent'
                  onClick={nextSlide}>
                  <img
                    src='src/assets/icon-arrow-right-light.svg'
                    title=''
                    alt=''
                    className='h-4 w-4'
                  />
                </button>
              </div>
            </div>
          </div>
          <div className='col-span-7 h-full'>
            <div className='rounded-16 border border-secondary-EDEDF6 bg-FAFAFD p-6'>
              <h1 className='fs-22 font-semibold uppercase'>{productDetail.name}</h1>
              <div className='mt-2 flex items-center gap-3'>
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
              <div className='mt-2 flex items-center justify-end rounded-10 border border-secondary-EDEDF6 bg-white p-2'>
                <p className='fs-14 max-w-[50%] truncate text-primary-F94545/70 line-through'>
                  <span>₫</span>
                  <span>{formatCurrency(productDetail.price_before_discount)}</span>
                </p>
                <p className='fs-14 ml-2 max-w-[50%] truncate text-secondary-1A162E'>
                  <span>₫</span>
                  <span>{formatCurrency(productDetail.price)}</span>
                </p>
                <p className='fs-12 ml-4 rounded-8 bg-primary-67B044 p-2 font-semibold'>
                  {calculateRateSale(productDetail.price_before_discount, productDetail.price)}
                </p>
              </div>
              <div className='mt-8 flex items-center justify-end gap-5'>
                <p className='fs-16 capitalize text-secondary-1A162E'>số lượng</p>
                <div className='flex items-center gap-1'>
                  <button className='b-sd flex h-8 w-8 items-center justify-center rounded-8 border border-secondary-EDEDF6 bg-transparent p-2 transition-colors hover:border-secondary-77DAE6'>
                    <img
                      src='src/assets/icon-arrow-left-light.svg'
                      title=''
                      alt=''
                      className='h-4 w-4'
                    />
                  </button>
                  <InputNumber
                    className='flex h-8 w-10 items-center overflow-hidden rounded-8 border border-secondary-EDEDF6 bg-white'
                    classNameError='hidden'
                    classNameInput='px-2 w-full h-full border-none bg-transparent text-center text-secondary-1A162E outline-none placeholder:fs-14 placeholder:text-secondary-1A162E/70'
                  />
                  <button className='b-sd flex h-8 w-8 items-center justify-center rounded-8 border border-secondary-EDEDF6 bg-transparent p-2 transition-colors hover:border-secondary-77DAE6'>
                    <img
                      src='src/assets/icon-arrow-right-light.svg'
                      title=''
                      alt=''
                      className='h-4 w-4'
                    />
                  </button>
                </div>
                <p className='fs-14 text-secondary-1A162E'>
                  {productDetail.quantity} sản phẩm có sẵn
                </p>
              </div>
              <div className='mt-8 flex items-center justify-end gap-5'>
                <button className='h-10 max-w-max rounded-8 bg-primary-FFB700 px-4'>
                  Thêm vào giỏ hàng
                </button>
                <button className='h-10 max-w-max rounded-8 border border-primary-FFB700 bg-transparent px-4'>
                  Đi đến thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className='mt-6 rounded-16 border border-secondary-EDEDF6 bg-FAFAFD p-6'
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(productDetail.description)
          }}></div>
      </div>
    </div>
  )
}
