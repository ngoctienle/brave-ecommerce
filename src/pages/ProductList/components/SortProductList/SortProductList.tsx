import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import cls from 'classnames'
import { omit } from 'lodash'

import paths from 'src/constants/paths'

import { sortBy, order as orderConstant } from 'src/constants/product'
import { ProductListConfig } from 'src/types/product.type'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const navigate = useNavigate()
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const page = Number(queryConfig.page)

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: paths.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handleSelectSort = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: paths.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  return (
    <div className='rounded-10 bg-FAFAFD p-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-5'>
          <p className='fs-18 font-semibold uppercase text-primary-1A162E'>Sắp xếp theo: </p>
          <button
            className={cls(
              'h-10 rounded-8 border border-secondary-EDEDF6 px-5 text-center text-primary-1A162E',
              {
                'bg-primary-FFB700': isActiveSortBy(sortBy.view),
                'bg-transparent': !isActiveSortBy(sortBy.view)
              }
            )}
            onClick={() => handleSort(sortBy.view)}>
            Phổ biến
          </button>
          <button
            className={cls(
              'h-10 rounded-8 border border-secondary-EDEDF6 px-5 text-center text-primary-1A162E',
              {
                'bg-primary-FFB700': isActiveSortBy(sortBy.createdAt),
                'bg-transparent': !isActiveSortBy(sortBy.createdAt)
              }
            )}
            onClick={() => handleSort(sortBy.createdAt)}>
            Mới nhất
          </button>
          <button
            className={cls(
              'h-10 rounded-8 border border-secondary-EDEDF6 px-5 text-center text-primary-1A162E',
              {
                'bg-primary-FFB700': isActiveSortBy(sortBy.sold),
                'bg-transparent': !isActiveSortBy(sortBy.sold)
              }
            )}
            onClick={() => handleSort(sortBy.sold)}>
            Bán chạy
          </button>
          <select
            className={cls(
              'h-10 rounded-8 border border-secondary-EDEDF6 px-5 text-left text-primary-1A162E outline-none',
              {
                'bg-primary-FFB700': isActiveSortBy(sortBy.price),
                'bg-transparent': !isActiveSortBy(sortBy.price)
              }
            )}
            value={order || ''}
            onChange={(e) =>
              handleSelectSort(e.target.value as Exclude<ProductListConfig['order'], undefined>)
            }>
            <option value='' disabled>
              Giá
            </option>
            <option value={orderConstant.asc} className='bg-white text-primary-1A162E'>
              Giá: Thấp đến cao
            </option>
            <option value={orderConstant.desc} className='bg-white text-primary-1A162E'>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <span>{page}</span>
          <span>/{pageSize}</span>
          <div className='ml-2 flex items-center gap-0.5'>
            {page === 1 ? (
              <span className='b-sd flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-8 border border-secondary-EDEDF6 bg-secondary-F8F8FB p-2'>
                <img src='/assets/icon-arrow-left-light.svg' alt='' className='h-4 w-4' />
              </span>
            ) : (
              <Link
                to={{
                  pathname: paths.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='b-sd flex h-8 w-8 items-center justify-center rounded-8 border border-secondary-EDEDF6 bg-secondary-F8F8FB p-2 transition-colors hover:border-secondary-77DAE6'>
                <img src='/assets/icon-arrow-left-light.svg' alt='' className='h-4 w-4' />
              </Link>
            )}
            {page === pageSize ? (
              <span className='b-sd flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-8 border border-secondary-EDEDF6 bg-secondary-F8F8FB p-2'>
                <img src='/assets/icon-arrow-right-light.svg' alt='' className='h-4 w-4' />
              </span>
            ) : (
              <Link
                to={{
                  pathname: paths.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='b-sd flex h-8 w-8 items-center justify-center rounded-8 border border-secondary-EDEDF6 bg-secondary-F8F8FB p-2 transition-colors hover:border-secondary-77DAE6'>
                <img src='/assets/icon-arrow-right-light.svg' alt='' className='h-4 w-4' />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
