import { Fragment } from 'react'

import Footer from 'src/components/Footer'
import AuthHeader from 'src/components/AuthHeader'

interface Props {
  children?: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <Fragment>
      <AuthHeader />
      <main> {children} </main>
      <Footer />
    </Fragment>
  )
}
