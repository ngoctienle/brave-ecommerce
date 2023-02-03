import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorMessage?: any
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    errorMessage,
    className,
    classNameInput = 'w-full md:h-12 h-10 rounded-10 border border-secondary-D2D1D6 placeholder:text-secondary-D2D1D6 placeholder:fs-14 md:placeholder:fs-16 fs-14 md:fs-16 text-primary-1A162E md:px-4 px-3 outline-none focus:border-primary-1A162E transition-colors',
    classNameError = 'mt-1 min-h-[1.25rem] fs-12 text-primary-F94545',
    onChange,
    value = '',
    ...restParams
  },
  ref
) {
  const { t } = useTranslation('error')
  const [localValue, setLocalValue] = useState<string>(value as string)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (/^\d+$/.test(value) || value === '') {
      onChange && onChange(e)
      setLocalValue(value)
    }
  }

  return (
    <div className={className}>
      <input
        className={classNameInput}
        onChange={handleChange}
        value={value || localValue}
        {...restParams}
        ref={ref}
      />
      <div className={classNameError}>{t(errorMessage)}</div>
    </div>
  )
})

export default InputNumber
