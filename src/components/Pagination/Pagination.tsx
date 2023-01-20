import { Link, createSearchParams } from 'react-router-dom'
import cls from 'classnames'

import { QueryConfig } from 'src/hooks/useQueryConfig'
import paths from 'src/constants/paths'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
const RANGE = 2

export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)

  const renderPagination = () => {
    let dotsAfter = false
    let dotsBefore = false

    const renderDotsBefore = (index: number) => {
      if (!dotsBefore) {
        dotsBefore = true
        return (
          <span
            key={index}
            className='b-sd flex h-8 w-8 items-center justify-center bg-transparent p-2 text-primary-1A162E'>
            ...
          </span>
        )
      }
      return null
    }

    const renderDotsAfter = (index: number) => {
      if (!dotsAfter) {
        dotsAfter = true
        return (
          <span
            key={index}
            className='b-sd flex h-8 w-8 items-center justify-center bg-transparent p-2 text-primary-1A162E'>
            ...
          </span>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (
          page <= RANGE * 2 + 1 &&
          pageNumber > page + RANGE &&
          pageNumber < pageSize - RANGE + 1
        ) {
          return renderDotsAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotsBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotsAfter(index)
          }
        } else if (
          page >= pageSize - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < page - RANGE
        ) {
          return renderDotsBefore(index)
        }
        return (
          <Link
            to={{
              pathname: paths.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={cls(
              'b-sd flex h-8 w-8 items-center justify-center rounded-8 border bg-transparent p-2 text-primary-1A162E transition-colors',
              {
                'border-secondary-77DAE6': pageNumber === page,
                'border-transparent hover:border-secondary-EDEDF6': pageNumber !== page
              }
            )}>
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='mt-6 flex flex-wrap justify-center gap-3'>
      {page === 1 ? (
        <span className='b-sd flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-8 border border-secondary-EDEDF6 bg-secondary-F8F8FB p-2'>
          <img src='/assets/icon-arrow-left-light.svg' title='' alt='' className='h-4 w-4' />
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
          className='b-sd flex h-8 w-8 items-center justify-center rounded-8 border border-secondary-EDEDF6 bg-transparent p-2 transition-colors hover:border-secondary-77DAE6'>
          <img src='/assets/icon-arrow-left-light.svg' title='' alt='' className='h-4 w-4' />
        </Link>
      )}
      {renderPagination()}
      {page === pageSize ? (
        <span className='bg-secondary-F8F8F8 b-sd flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-8 border border-secondary-EDEDF6 p-2'>
          <img src='/assets/icon-arrow-right-light.svg' title='' alt='' className='h-4 w-4' />
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
          className='b-sd flex h-8 w-8 items-center justify-center rounded-8 border border-secondary-EDEDF6 bg-transparent p-2 transition-colors hover:border-secondary-77DAE6'>
          <img src='/assets/icon-arrow-right-light.svg' title='' alt='' className='h-4 w-4' />
        </Link>
      )}
    </div>
  )
}
