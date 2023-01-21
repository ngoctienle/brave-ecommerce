import { Fragment } from 'react'

interface Props {
  children?: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <Fragment>
      <main> {children} </main>
    </Fragment>
  )
}
