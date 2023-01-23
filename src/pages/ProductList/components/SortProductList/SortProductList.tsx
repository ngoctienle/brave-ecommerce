import { Fragment } from 'react'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import cls from 'classnames'
import { omit } from 'lodash'
import { Menu, Transition } from '@headlessui/react'

import paths from 'src/constants/paths'

import { ArrowDown, ArrowLeft, ArrowRight } from 'src/components/Icon'
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
    <div className='rounded-10 bg-FAFAFD px-3 py-2 lg:p-4'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        {/* Sort Desktop */}
        <div className='hidden mlg:flex mlg:items-center mlg:gap-4'>
          <p className='fs-18 font-semibold uppercase text-primary-1A162E'>Sắp xếp theo: </p>
          <button
            className={cls(
              'h-10 rounded-8 border border-secondary-EDEDF6 px-5 text-center text-primary-1A162E',
              {
                'bg-secondary-77DAE6 font-semibold': isActiveSortBy(sortBy.view),
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
                'bg-secondary-77DAE6 font-semibold': isActiveSortBy(sortBy.createdAt),
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
                'bg-secondary-77DAE6 font-semibold': isActiveSortBy(sortBy.sold),
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
                'bg-secondary-77DAE6 font-semibold': isActiveSortBy(sortBy.price),
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
        {/* End Sort Desktop */}

        {/* Sort Mobile */}
        <Menu as='div' className='relative inline-block text-left mlg:hidden'>
          <Menu.Button className='fs-16 inline-flex h-9 w-full items-center justify-center rounded-10 font-semibold uppercase text-primary-1A162E outline-none focus:bg-transparent lg:fs-18 lg:h-10'>
            Sắp Xếp Theo
            <ArrowDown className='ml-2 h-4 w-4 lg:h-5 lg:w-5' stroke='#1A162E' />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'>
            <Menu.Items className='absolute -left-2 z-10 mt-2 flex w-[200px] origin-top-left flex-col justify-center rounded-16 bg-white p-3 shadow-lg'>
              <Menu.Item>
                <button
                  className={cls(
                    'fs-14 rounded-8 py-2 px-4 text-left transition-colors hover:bg-secondary-F8F8FB/60 hover:text-secondary-77DAE6 lg:fs-16 lg:py-3 lg:px-6',
                    {
                      'font-semibold text-secondary-77DAE6': isActiveSortBy(sortBy.view),
                      'font-normal text-primary-1A162E': !isActiveSortBy(sortBy.view)
                    }
                  )}
                  onClick={() => handleSort(sortBy.view)}>
                  Phổ biến
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  className={cls(
                    'fs-14 rounded-8 py-2 px-4 text-left transition-colors hover:bg-secondary-F8F8FB/60 hover:text-secondary-77DAE6 lg:fs-16 lg:py-3 lg:px-6',
                    {
                      'font-semibold text-secondary-77DAE6': isActiveSortBy(sortBy.createdAt),
                      'font-normal text-primary-1A162E': !isActiveSortBy(sortBy.createdAt)
                    }
                  )}
                  onClick={() => handleSort(sortBy.createdAt)}>
                  Mới nhất
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  className={cls(
                    'fs-14 rounded-8 py-2 px-4 text-left transition-colors hover:bg-secondary-F8F8FB/60 hover:text-secondary-77DAE6 lg:fs-16 lg:py-3 lg:px-6',
                    {
                      'font-semibold text-secondary-77DAE6': isActiveSortBy(sortBy.sold),
                      'font-normal text-primary-1A162E': !isActiveSortBy(sortBy.sold)
                    }
                  )}
                  onClick={() => handleSort(sortBy.sold)}>
                  Bán chạy
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
        {/* End Sort Mobile */}
        <div className='flex items-center'>
          <span className='fs-14 text-secondary-77DAE6'>{page}</span>
          <span
            className={`fs-14 ${
              pageSize === page ? 'text-secondary-77DAE6' : 'text-primary-1A162E'
            }`}>
            /{pageSize}
          </span>
          <div className='ml-2 flex items-center gap-0.5'>
            {page === 1 ? (
              <span className='b-sd flex h-7 w-7 cursor-not-allowed items-center justify-center rounded-8 border border-secondary-EDEDF6 bg-secondary-F8F8FB p-1 lg:h-8 lg:w-8 lg:p-2'>
                <ArrowLeft stroke='#1A162E' className='h-4 w-4' />
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
                className='b-sd flex h-7 w-7 items-center justify-center rounded-8 border border-secondary-EDEDF6 bg-secondary-F8F8FB p-1 transition-colors hover:border-secondary-77DAE6 lg:h-8 lg:w-8 lg:p-2'>
                <ArrowLeft stroke='#1A162E' className='h-4 w-4' />
              </Link>
            )}
            {page === pageSize ? (
              <span className='b-sd flex h-7 w-7 cursor-not-allowed items-center justify-center rounded-8 border border-secondary-EDEDF6 bg-secondary-F8F8FB p-1 lg:h-8 lg:w-8 lg:p-2'>
                <ArrowRight stroke='#1A162E' className='h-4 w-4' />
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
                className='b-sd flex h-7 w-7 items-center justify-center rounded-8 border border-secondary-EDEDF6 bg-secondary-F8F8FB p-1 transition-colors hover:border-secondary-77DAE6 lg:h-8 lg:w-8 lg:p-2'>
                <ArrowRight stroke='#1A162E' className='h-4 w-4' />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
