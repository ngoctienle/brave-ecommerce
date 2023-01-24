import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import cls from 'classnames'

import paths from 'src/constants/paths'

import { Category } from 'src/types/category.type'
import { NoUndefinedField } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rules'
import { QueryConfig } from 'src/hooks/useQueryConfig'

import Button from 'src/components/Button'
import InputNumber from 'src/components/InputNumber'
import SortRatingStar from '../SortRatingStar'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>

const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: paths.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })

  const handleRemoveAllFilter = () => {
    navigate({
      pathname: paths.home,
      search: createSearchParams(
        omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])
      ).toString()
    })
  }

  return (
    <div className='rounded-10 bg-FAFAFD p-3 lg:p-4'>
      <Link to={paths.home} className='mb-1 flex items-center lg:mb-2'>
        <img src='/assets/icon-more-light.svg' alt='' className='mr-2 h-4 w-4' />
        <span className='fs-16 font-semibold uppercase text-primary-1A162E lg:fs-18'>
          Tất cả danh mục
        </span>
      </Link>
      <ul className='list-disc border-t-[1px] border-t-secondary-D2D1D6 pt-1 pl-4 lg:pt-2'>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li className='py-1 lg:py-2' key={categoryItem._id}>
              <Link
                to={{
                  pathname: paths.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className='flex items-center'>
                <span
                  className={cls('fs-14 capitalize hover:underline', {
                    'font-semibold text-secondary-77DAE6': isActive,
                    'text-primary-1A162E': !isActive
                  })}>
                  {categoryItem.name}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={paths.home} className='mt-2 mb-1 flex items-center lg:mt-4 lg:mb-2'>
        <img src='/assets/icon-fillter-light.svg' alt='' className='mr-2 h-4 w-4' />
        <span className='fs-16 font-semibold uppercase text-primary-1A162E lg:fs-18'>
          Bộ lọc tìm kiếm
        </span>
      </Link>
      <div className='border-t-[1px] border-t-secondary-D2D1D6 py-1 lg:py-2'>
        <p className='fs-14 font-semibold capitalize text-primary-1A162E'>Khoảng giá</p>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='from'
                    classNameInput={cls(
                      'bg-white py-2 px-3 rounded-8 w-full outline-none placeholder:text-primary-1A162E/70 placeholder:fs-14 placeholder:capitalize border border-secondary-EDEDF6 transition-colors',
                      {
                        'border-primary-F94545': errors.price_min,
                        'focus:border-secondary-9E9DA8': !errors.price_min
                      }
                    )}
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                  />
                )
              }}
            />
            {/* <InputV2
              control={control}
              type='number'
              name='price_min'
              className='grow'
              placeholder='from'
              classNameInput={cls(
                'bg-white py-2 px-3 rounded-8 w-full outline-none placeholder:text-primary-1A162E/70 placeholder:fs-14 placeholder:capitalize border border-secondary-EDEDF6 transition-colors',
                {
                  'border-primary-F94545': errors.price_min,
                  'focus:border-secondary-9E9DA8': !errors.price_min
                }
              )}
              classNameError='hidden'
              onChange={() => {
                trigger('price_max')
              }}
            /> */}
            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='to'
                    classNameInput={cls(
                      'bg-white py-2 px-3 rounded-8 w-full outline-none placeholder:text-primary-1A162E/70 placeholder:fs-14 placeholder:capitalize border border-secondary-EDEDF6 transition-colors',
                      {
                        'border-primary-F94545': errors.price_max,
                        'focus:border-secondary-9E9DA8': !errors.price_max
                      }
                    )}
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                  />
                )
              }}
            />
          </div>
          <div className='fs-10 my-1 min-h-[1rem] text-center text-primary-F94545'>
            {errors.price_min?.message}
          </div>
          <Button className='fs-14 flex w-full items-center justify-center rounded-8 bg-primary-67B044/90 py-2 px-5 uppercase text-white transition-colors hover:bg-primary-67B044 mmd:p-2'>
            Áp dụng
          </Button>
        </form>
      </div>
      <p className='fs-14 font-semibold capitalize text-primary-1A162E'>Đánh giá</p>
      <SortRatingStar queryConfig={queryConfig} />
      <Button
        onClick={handleRemoveAllFilter}
        className='fs-14 flex w-full items-center justify-center rounded-8 bg-primary-F94545/90 py-2 px-5 uppercase text-white transition-colors hover:bg-primary-F94545 mmd:p-2'>
        Xóa tất cả
      </Button>
    </div>
  )
}
