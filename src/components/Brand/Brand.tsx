import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import { Logo } from '../Icon'

export default function Brand() {
  const { t } = useTranslation('home')

  return (
    <Fragment>
      <Logo className='h-6 w-6 lg:h-8 lg:w-8' fill='#77DAE6' />
      <span className='white-space-nowrap fs-16 ml-2 font-bold text-primary-1A162E md:fs-18 md:ml-3 lg:fs-22'>
        {t('header.brand-name')}
      </span>
    </Fragment>
  )
}
