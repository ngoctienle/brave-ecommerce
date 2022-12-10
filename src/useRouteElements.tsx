import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import paths from './constants/paths'

import MainLayout from 'src/layouts/MainLayout'
import RegisterLayout from 'src/layouts/RegisterLayout'
import Login from 'src/pages/Login'
import ProductList from 'src/pages/ProductList'
import Register from 'src/pages/Register'
import Profile from 'src/pages/Profile'

function ProtectedRoute() {
  const isAuthenticated = true
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  const isAuthenticated = false
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: paths.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: paths.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: paths.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    }
  ])
  return routeElements
}
