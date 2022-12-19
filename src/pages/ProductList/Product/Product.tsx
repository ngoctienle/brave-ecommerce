import { Link } from 'react-router-dom'

import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'

import ProductRating from 'src/components/ProductRating'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <Link to=''>
      <div className='relative w-full overflow-hidden pt-[100%]'>
        <img
          src={product.image}
          alt={product.name}
          title={product.name}
          className='absolute top-0 left-0 h-full w-full bg-white object-cover'
        />
      </div>
      <div className='overflow-hidden p-4'>
        <p className='fs-16 min-h-[32px] font-semibold text-secondary-1A162E line-clamp-2'>{product.name}</p>
        <div className='mt-3 flex items-center'>
          <p className='fs-14 max-w-[50%] truncate text-primary-F94545/70 line-through'>
            <span>₫</span>
            <span>{formatCurrency(product.price_before_discount)}</span>
          </p>
          <p className='fs-14 ml-2 max-w-[50%] truncate text-secondary-1A162E'>
            <span>₫</span>
            <span>{formatCurrency(product.price)}</span>
          </p>
        </div>
        <div className='mt-3 flex items-center justify-end'>
          <ProductRating rating={product.rating} />
          <p className='fs-14 ml-2 font-semibold text-secondary-1A162E'>
            <span>{formatNumberToSocialStyle(product.sold)}</span>
            <span className='ml-1'>Đã bán</span>
          </p>
        </div>
      </div>
    </Link>
  )
}
