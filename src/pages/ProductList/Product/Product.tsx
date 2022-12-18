import { Link } from 'react-router-dom'

export default function Product() {
  return (
    <Link to=''>
      <div className='rounded-8 bg-white shadow transition-transform duration-100 hover:translate-y-[-0.0625rem] hover:shadow-sm'>
        <div className='relative w-full pt-[100%]'>
          <img src='' alt='' className='absolute top-0 left-0 h-full w-full bg-white object-cover' />
        </div>
        <div className='overflow-hidden p-2'>
          <p className='min-h-[32px] line-clamp-2'>Đây là tên sản phẩm trong product list với cú pháp hạn chế 2 dòng</p>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate line-through'>$2000</div>
            <div className='ml-1 max-w-[50%] truncate'>$2000</div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <div className='flex items-center'>
              <div className='relative'>
                <div className='absolute top-0 left-0 h-full overflow-hidden' style={{ width: '50%' }}>
                  <svg
                    enableBackground='new 0 0 24 24'
                    viewBox='0 0 24 24'
                    x={0}
                    y={0}
                    className='h-4 w-4 fill-primary-FFB700 text-primary-FFB700'
                  >
                    <path
                      id='Stroke 1'
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z'
                    />
                  </svg>
                </div>
                <svg
                  enableBackground='new 0 0 24 24'
                  x={0}
                  y={0}
                  viewBox='0 0 24 24'
                  className='h-4 w-4 fill-current text-secondary-D2D1D6'
                >
                  <path
                    id='Stroke 1'
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </div>
            <div className='ml-2'>
              <span>5.66k</span>
              <span>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
