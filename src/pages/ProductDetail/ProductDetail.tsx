import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import productApi from 'src/apis/product.api'

import InputNumber from 'src/components/InputNumber'
import ProductRating from 'src/components/ProductRating'
import { calculateRateSale, formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'
import DOMPurify from 'dompurify'

export default function ProductDetail() {
  const { id } = useParams()
  const { data: productDetailData } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })

  const productDetail = productDetailData?.data.data
  if (!productDetail) return null
  return (
    <div className='py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-5'>
            <div className='rounded-16 border border-secondary-EDEDF6 bg-FAFAFD p-6'>
              <div className='b-sd relative w-full overflow-hidden rounded-10 pt-[100%]'>
                <img
                  src={productDetail.image}
                  alt={productDetail.name}
                  title={productDetail.name}
                  className='absolute top-0 left-0 h-full w-full bg-white object-cover'
                />
              </div>
              <div className='relative mt-6 grid grid-cols-5 gap-3'>
                <button className='absolute -left-5 top-1/2 h-4 w-4 -translate-y-1/2 bg-transparent'>
                  <img
                    src='src/assets/icon-arrow-left-light.svg'
                    title=''
                    alt=''
                    className='h-4 w-4'
                  />
                </button>
                {productDetail.images.slice(0, 5).map((img, index) => {
                  const isActive = index === 0
                  return (
                    <div
                      className='z-1 relative w-full overflow-hidden rounded-8 pt-[100%]'
                      key={index}>
                      <img
                        src={productDetail.image}
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
                <button className='absolute -right-5 top-1/2 h-4 w-4 -translate-y-1/2 bg-transparent'>
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
              <div className='mt-2 flex items-center rounded-10 border border-secondary-EDEDF6 bg-white justify-end p-2'>
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
