import InputNumber, { InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onTyping?: (value: number) => void
  classNameWrapper?: string
}

export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  classNameWrapper = '',
  onTyping,
  value,
  ...rest
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onTyping && onTyping(_value)
  }

  const increase = () => {
    let _value = Number(value) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }

    onIncrease && onIncrease(_value)
  }

  const decrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 1
    }

    onDecrease && onDecrease(_value)
  }

  return (
    <div className={'flex items-center gap-1' + classNameWrapper}>
      <button
        className='b-sd flex h-8 w-8 items-center justify-center rounded-8 border border-secondary-EDEDF6 bg-transparent p-2 transition-colors hover:border-secondary-77DAE6'
        onClick={decrease}>
        <img src='/assets/icon-arrow-left-light.svg' title='' alt='' className='h-4 w-4' />
      </button>
      <InputNumber
        className='flex h-8 w-10 items-center overflow-hidden rounded-8 border border-secondary-EDEDF6 bg-white'
        classNameError='hidden'
        classNameInput='px-2 w-full h-full border-none bg-transparent text-center text-secondary-1A162E outline-none placeholder:fs-14 placeholder:text-secondary-1A162E/70'
        onChange={handleChange}
        value={value}
        {...rest}
      />
      <button
        className='b-sd flex h-8 w-8 items-center justify-center rounded-8 border border-secondary-EDEDF6 bg-transparent p-2 transition-colors hover:border-secondary-77DAE6'
        onClick={increase}>
        <img src='/assets/icon-arrow-right-light.svg' title='' alt='' className='h-4 w-4' />
      </button>
    </div>
  )
}
