import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

export default function InputNumber({
  errorMessage,
  className,
  classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
  classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
  onChange,
  ...restParams
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(e)
    }
  }

  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleChange} {...restParams} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
