import { Fragment } from 'react'

export default function Brand() {
  return (
    <Fragment>
      <img
        src='/assets/logo.svg'
        alt='Brave Ecommerce'
        title='Brave Ecommerce'
        className='h-6 w-6 lg:h-8 lg:w-8'
      />
      <span className='white-space-nowrap fs-16 ml-2 font-bold text-primary-1A162E md:fs-18 md:ml-3 lg:fs-22'>
        Brave Shop
      </span>
    </Fragment>
  )
}
