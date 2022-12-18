import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import paths from 'src/constants/paths'

export default function AsideFilter() {
  return (
    <div className='rounded-10 bg-FAFAFD p-4'>
      <Link to={paths.home} className='mb-2 flex items-center'>
        <img src='src/assets/icon-more-light.svg' alt='' className='mr-2 h-4 w-4' />
        <span className='fs-18 font-semibold uppercase text-secondary-1A162E'>Tất cả danh mục</span>
      </Link>
      <ul className='list-disc border-t-[1px] border-t-secondary-D2D1D6 pt-2 pl-4'>
        <li className='py-2'>
          <Link to={paths.home} className='flex items-center'>
            <span className='fs-14 capitalize text-secondary-1A162E'>Thời trang nam</span>
          </Link>
        </li>
        <li className='py-2'>
          <Link to={paths.home} className='flex items-center'>
            <span className='fs-14 capitalize text-secondary-1A162E'>Thời trang nam</span>
          </Link>
        </li>
      </ul>
      <Link to={paths.home} className='mt-4 mb-2 flex items-center'>
        <img src='src/assets/icon-fillter-light.svg' alt='' className='mr-2 h-4 w-4' />
        <span className='fs-18 font-semibold uppercase text-secondary-1A162E'>Bộ lọc tìm kiếm</span>
      </Link>
      <div className='border-t-[1px] border-t-secondary-D2D1D6 py-2'>
        <p className='fs-14 font-semibold capitalize text-secondary-1A162E'>Khoản giá</p>
        <form className='mt-2'>
          <div className='flex items-start'>
            <Input
              type='text'
              className='grow'
              name='from'
              placeholder='from'
              classNameInput='bg-white py-2 px-3 rounded-8 w-full outline-none placeholder:text-secondary-1A162E/70 placeholder:fs-14 placeholder:capitalize border border-sencondary-1A162E'
            />
            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Input
              type='text'
              className='grow'
              name='to'
              placeholder='to'
              classNameInput='bg-white py-2 px-3 rounded-8 w-full outline-none placeholder:text-secondary-1A162E/70 placeholder:fs-14 placeholder:capitalize border border-sencondary-1A162E'
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
                <img key={index} src='src/assets/icon-start-full-light.svg' alt='' className='h-4 w-4' />
              ))}
            <span className='fs-12 ml-3 text-secondary-1A162E'>Trở lên</span>
          </Link>
        </li>
        <li className='py-1'>
          <Link to='' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <img key={index} src='src/assets/icon-start-full-light.svg' alt='' className='h-4 w-4' />
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
