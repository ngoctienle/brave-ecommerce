import { useTranslation } from 'react-i18next'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { StarIcon as StartOutLine } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'

import { QueryConfig } from 'src/hooks/useQueryConfig'

import paths from 'src/constants/paths'

interface Props {
  queryConfig: QueryConfig
}

export default function SortRatingStar({ queryConfig }: Props) {
  const { t } = useTranslation('product')
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
    <ul className='mb-2 border-b-[1px] border-b-secondary-D2D1D6 py-1 lg:mb-4 lg:py-2'>
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
                    return <StarIcon key={indexStart} className='h-4 w-4' />
                  }
                  return <StartOutLine key={indexStart} className='h-4 w-4' />
                })}
              {index !== 0 && (
                <span className='fs-12 ml-3 text-primary-1A162E'>{t('product:txt-above')}</span>
              )}
            </div>
          </li>
        ))}
    </ul>
  )
}
