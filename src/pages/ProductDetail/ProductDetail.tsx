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
          <div className='col-span-7'>
            <div className='rounded-16 border border-secondary-EDEDF6 bg-FAFAFD p-6'>
              <h1 className='fs-22 font-semibold uppercase'>{productDetail.name}</h1>
              <div className='mt-2 flex items-center justify-end gap-3'>
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
              <div className='mt-2 flex items-center bg-white p-4 rounded-10 border border-secondary-EDEDF6 justify-end'>
                <p className='fs-14 max-w-[50%] truncate text-primary-F94545/70 line-through'>
                  <span>₫</span>
                  <span>{formatCurrency(productDetail.price_before_discount)}</span>
                </p>
                <p className='fs-14 ml-2 max-w-[50%] truncate text-secondary-1A162E'>
                  <span>₫</span>
                  <span>{formatCurrency(productDetail.price)}</span>
                </p>
                <p className='bg-orange ml-4 rounded px-1 py-[2px] text-xs font-semibold'>
                  {calculateRateSale(productDetail.price_before_discount, productDetail.price)}
                </p>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-black'>số lượng</div>
                <div className='ml-10 flex items-center'>
                  <button className='flex h-8 w-8 items-center justify-center'>
                    <img
                      src='src/assets/icon-arrow-left-light.svg'
                      title=''
                      alt=''
                      className='h-4 w-4'
                    />
                  </button>
                  <InputNumber value={1} className='' classNameError='hidden' classNameInput='' />
                  <button className='flex h-8 w-8 items-center justify-center'>
                    <img
                      src='src/assets/icon-arrow-right-light.svg'
                      title=''
                      alt=''
                      className='h-4 w-4'
                    />
                  </button>
                </div>
                <div>{productDetail.quantity}Số lượng sản phẩm có sẵn</div>
                <div>
                  <button>Thêm</button>
                  <button>Mua</button>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(productDetail.description)
                  }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
