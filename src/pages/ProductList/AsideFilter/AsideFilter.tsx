import { Link, createSearchParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import cls from 'classnames'

import paths from 'src/constants/paths'

import { QueryConfig } from '../ProductList'
import { Category } from 'src/types/category.type'
import { schema } from 'src/utils/rules'

import Button from 'src/components/Button'
import InputNumber from 'src/components/InputNumber'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = {
  price_min: string
  price_max: string
}

const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema)
  })

  return (
    <div className='rounded-10 bg-FAFAFD p-4'>
      <Link to={paths.home} className='mb-2 flex items-center'>
        <img src='src/assets/icon-more-light.svg' alt='' className='mr-2 h-4 w-4' />
        <span className='fs-18 font-semibold uppercase text-secondary-1A162E'>Tất cả danh mục</span>
      </Link>
      <ul className='list-disc border-t-[1px] border-t-secondary-D2D1D6 pt-2 pl-4'>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li className='py-2' key={categoryItem._id}>
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
                  className={cls('fs-14 capitalize text-secondary-1A162E', {
                    'font-semibold': isActive
                  })}>
                  {categoryItem.name}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={paths.home} className='mt-4 mb-2 flex items-center'>
        <img src='src/assets/icon-fillter-light.svg' alt='' className='mr-2 h-4 w-4' />
        <span className='fs-18 font-semibold uppercase text-secondary-1A162E'>Bộ lọc tìm kiếm</span>
      </Link>
      <div className='border-t-[1px] border-t-secondary-D2D1D6 py-2'>
        <p className='fs-14 font-semibold capitalize text-secondary-1A162E'>Khoản giá</p>
        <form className='mt-2'>
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
                    classNameInput='bg-white py-2 px-3 rounded-8 w-full outline-none placeholder:text-secondary-1A162E/70 placeholder:fs-14 placeholder:capitalize border border-sencondary-1A162E'
                    onChange={field.onChange}
                    value={field.value}
                  />
                )
              }}
            />
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
                    classNameInput='bg-white py-2 px-3 rounded-8 w-full outline-none placeholder:text-secondary-1A162E/70 placeholder:fs-14 placeholder:capitalize border border-sencondary-1A162E'
                    onChange={field.onChange}
                    value={field.value}
                  />
                )
              }}
            />
          </div>
          <Button className='fs-14 flex w-full items-center justify-center rounded-8 bg-primary-67B044 p-2 uppercase text-white'>
            Áp dụng
          </Button>
        </form>
      </div>
      <p className='fs-14 font-semibold capitalize text-secondary-1A162E'>Đánh giá</p>
      <ul className='mb-4 border-b-[1px] border-b-secondary-D2D1D6 py-2'>
        <li className='py-1'>
          <Link to='' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <img
                  key={index}
                  src='src/assets/icon-start-full-light.svg'
                  alt=''
                  className='h-4 w-4'
                />
              ))}
            <span className='fs-12 ml-3 text-secondary-1A162E'>Trở lên</span>
          </Link>
        </li>
        <li className='py-1'>
          <Link to='' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <img
                  key={index}
                  src='src/assets/icon-start-full-light.svg'
                  alt=''
                  className='h-4 w-4'
                />
              ))}
            <span className='fs-12 ml-3 text-secondary-1A162E'>Trở lên</span>
          </Link>
        </li>
      </ul>
      <Button className='fs-14 flex w-full items-center justify-center rounded-8 bg-primary-F94545 p-2 uppercase text-white'>
        Xóa tất cả
      </Button>
    </div>
  )
}
