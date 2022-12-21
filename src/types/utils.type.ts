export interface SuccessRespone<Data> {
  message: string
  data: Data
}
export interface ErrorRespone<Data> {
  message: string
  data?: Data
}

//-? is the syntax for removing optional key (undefined)
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
