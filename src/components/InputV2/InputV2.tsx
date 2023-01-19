import { InputHTMLAttributes, useState } from 'react'
import { FieldValues, FieldPath, useController, UseControllerProps } from 'react-hook-form'

export type InputNumberProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  classNameInput?: string
  classNameError?: string
} & InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<TFieldValues, TName>

function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: InputNumberProps<TFieldValues, TName>) {
  const {
    type,
    onChange,
    className,
    classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    value = '',
    ...restParams
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = e.target.value
    const isNumber = type === 'number' && (/^\d+$/.test(valueFromInput) || valueFromInput === '')
    if (isNumber || type !== 'number') {
      //Update LocalState value
      setLocalValue(valueFromInput)
      //Call field.onChange for updating into state of RHF
      field.onChange(e)
      //Running onChange callback from parents
      onChange && onChange(e)
    }
  }

  return (
    <div className={className}>
      <input
        className={classNameInput}
        {...restParams}
        {...field}
        onChange={handleChange}
        value={value || localValue}
      />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}

export default InputV2
