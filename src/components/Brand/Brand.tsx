import { Fragment } from 'react'

export default function Brand() {
  return (
    <Fragment>
      <img
        src='/assets/logo.svg'
        alt='Brave Ecommerce'
        title='Brave Ecommerce'
        width={32}
        height={32}
      />
      <span className='fs-22 ml-3 font-bold text-secondary-1A162E'>Brave Ecommerce</span>
    </Fragment>
  )
}
