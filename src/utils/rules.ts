import type { UseFormGetValues, RegisterOptions } from 'react-hook-form'
import * as yup from 'yup'
import { AnyObject } from 'yup/lib/types'

type Rules = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: { value: true, message: 'email.required' },
    pattern: { value: /^\S+@\S+\.\S+$/, message: 'email.valid' },
    maxLength: {
      value: 160,
      message: 'email.length'
    },
    minLength: {
      value: 5,
      message: 'email.length'
    }
  },
  password: {
    required: { value: true, message: 'pw.required' },
    maxLength: {
      value: 160,
      message: 'pw.length'
    },
    minLength: {
      value: 6,
      message: 'pw.length'
    }
  },
  confirm_password: {
    required: { value: true, message: 'confirm-pw.required' },
    maxLength: {
      value: 160,
      message: 'confirm-pw.length'
    },
    minLength: {
      value: 6,
      message: 'confirm-pw.length'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'confirm-pw.same'
        : undefined
  }
})

function testYupPriceMinMax(this: yup.TestContext<AnyObject>) {
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

const handleYupConfirmPw = (refString: string) => {
  return yup
    .string()
    .required('confirm-pw.required')
    .min(6, 'confirm-pw.length')
    .max(160, 'confirm-pw.length')
    .oneOf([yup.ref(refString)], 'confirm-pw.same')
}

export const schema = yup.object({
  email: yup
    .string()
    .required('email.required')
    .email('email.valid')
    .min(5, 'email.length')
    .max(160, 'email.length'),
  password: yup.string().required('pw.required').min(6, 'pw.length').max(160, 'pw.length'),
  confirm_password: handleYupConfirmPw('password'),
  price_min: yup.string().test({
    name: 'price-not-allow',
    message: 'price.valid',
    test: testYupPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allow',
    message: 'price.valid',
    test: testYupPriceMinMax
  }),
  name: yup.string().trim().required()
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'error:name'),
  phone: yup.string().max(20, 'error:phone'),
  address: yup.string().max(160, 'error:address'),
  avatar: yup.string().max(1000, 'error:avatar'),
  date_of_birth: yup.date().max(new Date(), 'error:dob'),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_password: handleYupConfirmPw('new_password')
})

export type UserSchema = yup.InferType<typeof userSchema>

export type Schema = yup.InferType<typeof schema>
