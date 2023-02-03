import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Product as ProductType } from 'src/types/product.type'
import {
  convertToEN,
  formatCurrency,
  formatNumberToSocialStyle,
  generateNameId
} from 'src/utils/utils'

import ProductRating from 'src/components/ProductRating'
import paths from 'src/constants/paths'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  const { t, i18n } = useTranslation('product')
  const currentLanguage = i18n.language

  return (
    <Link to={`${paths.home}${generateNameId({ name: product.name, id: product._id })}`}>
      <div className='relative w-full overflow-hidden pt-[100%]'>
        <img
          src={product.image}
          alt={product.name}
          title={product.name}
          className='absolute top-0 left-0 h-full w-full bg-white object-cover'
        />
      </div>
      <div className='overflow-hidden p-3 mlg:p-4'>
        <p className='fs-14 font-semibold capitalize text-primary-1A162E line-clamp-2 mlg:fs-16 mlg:min-h-[48px]'>
          {currentLanguage === 'vi' ? product.name : convertToEN(product.name)}
        </p>
        <div className='mt-2 flex items-center mlg:mt-3'>
          <p className='fs-14 max-w-[50%] truncate text-primary-F94545/70 line-through'>
            <span>₫</span>
            <span>{formatCurrency(product.price_before_discount)}</span>
          </p>
          <p className='fs-14 ml-2 max-w-[50%] truncate text-primary-1A162E'>
            <span>₫</span>
            <span>{formatCurrency(product.price)}</span>
          </p>
        </div>
        <div className='mt-2 flex flex-wrap items-center justify-between mlg:mt-3 mlg:justify-end'>
          <ProductRating rating={product.rating} />
          <p className='fs-14 font-semibold text-primary-1A162E mlg:ml-2'>
            <span>{formatNumberToSocialStyle(product.sold)}</span>
            <span className='ml-1'>{t('product:txt-sold')}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}
