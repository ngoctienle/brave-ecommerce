import { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import range from 'lodash/range'

import { ChevronDownIcon } from '@heroicons/react/24/outline'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DataSelect({ value, onChange, errorMessage }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })
  const { t } = useTranslation('general')

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect, name } = event.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelect)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <Fragment>
      <div className='flex flex-col gap-2 md:gap-3'>
        <p className='fs-14 font-semibold capitalize text-primary-1A162E md:fs-16'>
          {t('general:dob')}
        </p>
        <div className='flex gap-3 sm:gap-5'>
          <div className='relative w-1/3'>
            <select
              onChange={handleChange}
              name='date'
              className='fs-14 h-10 w-full appearance-none rounded-10 border border-secondary-D2D1D6 px-3 text-primary-1A162E outline-none transition-colors placeholder:fs-14 placeholder:text-secondary-D2D1D6 focus:border-primary-1A162E md:fs-16 md:h-12 md:px-4 md:placeholder:fs-16'
              value={value?.getDate() || date.date}>
              <option disabled>{t('general:date')}</option>
              {range(1, 32).map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronDownIcon className='absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-primary-1A162E' />
          </div>
          <div className='relative w-1/3'>
            <select
              onChange={handleChange}
              name='month'
              className='fs-14 h-10 w-full appearance-none rounded-10 border border-secondary-D2D1D6 px-3 text-primary-1A162E outline-none transition-colors placeholder:fs-14 placeholder:text-secondary-D2D1D6 focus:border-primary-1A162E md:fs-16 md:h-12 md:px-4 md:placeholder:fs-16'
              value={value?.getMonth() || date.month}>
              <option disabled>{t('general:month')}</option>
              {range(0, 12).map((item) => (
                <option value={item} key={item}>
                  {item + 1}
                </option>
              ))}
            </select>
            <ChevronDownIcon className='absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-primary-1A162E' />
          </div>
          <div className='relative w-1/3'>
            <select
              onChange={handleChange}
              name='year'
              className='fs-14 h-10 w-full appearance-none rounded-10 border border-secondary-D2D1D6 px-3 text-primary-1A162E outline-none transition-colors placeholder:fs-14 placeholder:text-secondary-D2D1D6 focus:border-primary-1A162E md:fs-16 md:h-12 md:px-4 md:placeholder:fs-16'
              value={value?.getFullYear() || date.year}>
              <option disabled>{t('general:year')}</option>
              {range(1990, 2024).map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronDownIcon className='absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-primary-1A162E' />
          </div>
        </div>
      </div>
      <div className='fs-12 mt-1 min-h-[1.25rem] text-primary-F94545'>{errorMessage}</div>
    </Fragment>
  )
}
