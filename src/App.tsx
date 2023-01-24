import { Fragment, useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { AppContext } from './contexts/app.context'
import { LocalStorageEventTarget } from './utils/auth'
import useRouteElements from './useRouteElements'

function App() {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
    <Fragment>
      {routeElements}
      <ToastContainer position='bottom-right' />
    </Fragment>
  )
}

export default App
