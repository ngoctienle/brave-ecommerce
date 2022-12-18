export default function SortProductList() {
  return (
    <div className='rounded-10 bg-FAFAFD p-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-5'>
          <p className='fs-18 font-semibold uppercase text-secondary-1A162E'>Sắp xếp theo: </p>
          <button className='border-sencondary-1A162E h-10 rounded-8 border bg-primary-FFB700 px-5 text-center text-secondary-1A162E hover:bg-primary-FFB700/80'>
            Phổ biến
          </button>
          <button className='border-sencondary-1A162E h-10 rounded-8 border bg-transparent px-5 text-center text-secondary-1A162E'>
            Mới nhất
          </button>
          <button className='border-sencondary-1A162E h-10 rounded-8 border bg-transparent px-5 text-center text-secondary-1A162E'>
            Bán chạy
          </button>
          <select
            className='border-sencondary-1A162E h-10 rounded-8 border bg-transparent px-5 text-left text-secondary-1A162E outline-none'
            value=''
          >
            <option value='' disabled>
              Giá
            </option>
            <option value='price:asc'>Giá: Thấp đến cao</option>
            <option value='price:desc'>Giá: Cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <span>1</span>
          <span>/2</span>
          <div className='ml-2 flex items-center gap-0.5'>
            <button className='border-sencondary-1A162E h-10 cursor-not-allowed rounded-tl-8 rounded-bl-8 border bg-EEEEEE px-3'>
              <img src='src/assets/icon-arrow-left-light.svg' alt='' className='h-4 w-4' />
            </button>
            <button className='border-sencondary-1A162E h-10 rounded-tr-8 rounded-br-8 border bg-white px-3'>
              <img src='src/assets/icon-arrow-right-light.svg' alt='' className='h-4 w-4' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
