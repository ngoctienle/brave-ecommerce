import { useTranslation } from 'react-i18next'

import Brand from '../Brand'

export default function Footer() {
  const { t } = useTranslation('general')
  return (
    <footer className='bg-FAFAFD py-5 font-brave-ecom'>
      <div className='container'>
        <div className='mb-2 flex items-center justify-center lg:mb-4'>
          <Brand />
        </div>
        <p className='fs-14 text-center text-primary-1A162E lg:fs-16'>
          ©2023 - {t('general:copyright')} BraveThinking Ecosystem
        </p>
      </div>
    </footer>
  )
}
