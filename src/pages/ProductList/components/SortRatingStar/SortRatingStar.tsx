import { createSearchParams, useNavigate } from 'react-router-dom'

import { QueryConfig } from 'src/hooks/useQueryConfig'

import paths from 'src/constants/paths'

interface Props {
  queryConfig: QueryConfig
}

export default function SortRatingStar({ queryConfig }: Props) {
  const navigate = useNavigate()

  const handleFilterStar = (ratingFilter: number) => {
    navigate({
      pathname: paths.home,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(ratingFilter)
      }).toString()
    })
  }

  return (
    <ul className='mb-4 border-b-[1px] border-b-secondary-D2D1D6 py-2'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <li className='py-1' key={index}>
            <div
              className='flex cursor-pointer items-center text-sm'
              onClick={() => handleFilterStar(5 - index)}
              tabIndex={0}
              role='button'
              aria-hidden='true'>
              {Array(5)
                .fill(0)
                .map((_, indexStart) => {
                  if (indexStart < 5 - index) {
                    return (
                      <img
                        key={indexStart}
                        src='src/assets/icon-start-full-light.svg'
                        alt=''
                        className='h-4 w-4'
                      />
                    )
                  }
                  return (
                    <img
                      key={indexStart}
                      src='src/assets/icon-start-light.svg'
                      alt=''
                      className='h-4 w-4'
                    />
                  )
                })}
              {index !== 0 && <span className='fs-12 ml-3 text-secondary-1A162E'>Trở lên</span>}
            </div>
          </li>
        ))}
    </ul>
  )
}
