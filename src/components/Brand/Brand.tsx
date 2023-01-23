import { Fragment } from 'react'
import { Logo } from '../Icon'

export default function Brand() {
  return (
    <Fragment>
      <Logo className='h-6 w-6 lg:h-8 lg:w-8' fill='#77DAE6' />
      <span className='white-space-nowrap fs-16 ml-2 font-bold text-primary-1A162E md:fs-18 md:ml-3 lg:fs-22'>
        Brave Shop
      </span>
    </Fragment>
  )
}
