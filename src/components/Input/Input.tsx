import { InputHTMLAttributes, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorMessage?: any
  classNameInput?: string
  classNameError?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({
  errorMessage,
  className,
  name,
  register,
  rules,
  classNameInput = 'w-full md:h-12 h-10 rounded-10 border border-secondary-D2D1D6 placeholder:text-secondary-D2D1D6 placeholder:fs-14 md:placeholder:fs-16 fs-14 md:fs-16 text-primary-1A162E md:px-4 px-3 outline-none focus:border-primary-1A162E transition-colors',
  classNameError = 'mt-1 min-h-[1.25rem] fs-12 text-primary-F94545',
  ...restParams
}: Props) {
  const { t } = useTranslation('error')
  const [visible, setVisible] = useState(false)
  const registerResult = register && name ? register(name, rules) : null

  const toggleVisible = () => {
    setVisible((prev) => !prev)
  }

  const handleType = () => {
    if (restParams.type === 'password') {
      return visible ? 'text' : 'password'
    }
    return restParams.type
  }

  return (
    <div className={className}>
      <input className={classNameInput} {...registerResult} {...restParams} type={handleType()} />
      {restParams.type === 'password' && visible && (
        <EyeIcon
          className='absolute top-[14px] right-3 h-5 w-5 cursor-pointer md:right-4'
          onClick={toggleVisible}
        />
      )}
      {restParams.type === 'password' && !visible && (
        <EyeSlashIcon
          className='absolute top-[14px] right-3 h-5 w-5 cursor-pointer md:right-4'
          onClick={toggleVisible}
        />
      )}
      <div className={classNameError}>{t(errorMessage)}</div>
    </div>
  )
}
