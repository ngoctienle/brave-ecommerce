import { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import useRouteElements from './useRouteElements'

function App() {
  const routeElements = useRouteElements()
  return (
    <Fragment>
      {routeElements}
      <ToastContainer />
    </Fragment>
  )
}

export default App
