import React, { useState } from 'react'
import InputNumber, { InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onTyping?: (value: number) => void
  onFocusOut?: (value: number) => void
  classNameWrapper?: string
}

export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  onTyping,
  onFocusOut,
  classNameWrapper = '',
  value,
  ...rest
}: Props) {
  const [localValue, setLocalValue] = useState<number>(Number(value || 0))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onTyping && onTyping(_value)
    setLocalValue(_value)
  }

  const increase = () => {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }

  const decrease = () => {
    let _value = Number(value || localValue) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocusOut && onFocusOut(Number(e.target.value))
  }

  return (
    <div className={'flex items-center gap-1 ' + classNameWrapper}>
      <button
        className='b-sd flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-8 border border-secondary-EDEDF6 bg-transparent p-2 transition-colors hover:border-secondary-77DAE6 lg:h-8 lg:w-8'
        onClick={decrease}>
        <img src='/assets/icon-arrow-left-light.svg' title='' alt='' className='h-4 w-4' />
      </button>
      <InputNumber
        className='flex h-7 w-9 flex-shrink-0 items-center overflow-hidden rounded-8 border border-secondary-EDEDF6 bg-white lg:h-8 lg:w-10'
        classNameError='hidden'
        classNameInput='px-2 w-full h-full border-none bg-transparent text-center text-primary-1A162E outline-none placeholder:fs-14 placeholder:text-primary-1A162E/70'
        onChange={handleChange}
        onBlur={handleBlur}
        value={value || localValue}
        {...rest}
      />
      <button
        className='b-sd flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-8 border border-secondary-EDEDF6 bg-transparent p-2 transition-colors hover:border-secondary-77DAE6 lg:h-8 lg:w-8'
        onClick={increase}>
        <img src='/assets/icon-arrow-right-light.svg' title='' alt='' className='h-4 w-4' />
      </button>
    </div>
  )
}
