import { Fragment, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import config from 'src/constants/config'

interface Props {
  onChange?: (file?: File) => void
}

export default function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation('general')

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    fileInputRef.current?.setAttribute('value', '')
    if (
      fileFromLocal &&
      (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))
    ) {
      toast.error(`${t('general:save')}:.JPEG, .PNG`)
    } else {
      onChange && onChange(fileFromLocal)
    }
  }
  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <Fragment>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(event.target as any).value = null
        }}
      />
      <button
        className='fs-14 flex h-9 items-center justify-center rounded-10 border border-secondary-D2D1D6 px-3 text-primary-1A162E transition-colors hover:border-primary-1A162E md:fs-16 md:h-10 md:px-4'
        type='button'
        onClick={handleUpload}>
        {t('general:select-pic')}
      </button>
    </Fragment>
  )
}
