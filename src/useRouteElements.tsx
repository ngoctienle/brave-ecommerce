import { useContext, lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './contexts/app.context'

import paths from 'src/constants/paths'

import MainLayout from 'src/layouts/MainLayout'
import AuthLayout from 'src/layouts/AuthLayout'
import UserLayout from 'src/pages/User/layouts'

const Login = lazy(() => import('src/pages/Login'))
const Register = lazy(() => import('src/pages/Register'))
const Cart = lazy(() => import('src/pages/Cart'))

const ProductList = lazy(() => import('src/pages/ProductList'))
const ProductDetail = lazy(() => import('src/pages/ProductDetail'))

const Profile = lazy(() => import('src/pages/User/pages/Profile'))
const ChangePassword = lazy(() => import('src/pages/User/pages/ChangePassword'))
const HistoryPurchase = lazy(() => import('src/pages/User/pages/HistoryPurchase'))

const NotFound = lazy(() => import('src/pages/NotFound'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={paths.login} />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={paths.home} />
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
            <AuthLayout>
              <Suspense>
                <Login />
              </Suspense>
            </AuthLayout>
          )
        },
        {
          path: paths.register,
          element: (
            <AuthLayout>
              <Suspense>
                <Register />
              </Suspense>
            </AuthLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: paths.cart,
          element: (
            <MainLayout>
              <Suspense>
                <Cart />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: paths.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: paths.profile,
              element: (
                <Suspense>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: paths.changePassword,
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              )
            },
            {
              path: paths.historyPurchase,
              element: (
                <Suspense>
                  <HistoryPurchase />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: paths.productDetail,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <Suspense>
          <NotFound />
        </Suspense>
      )
    }
  ])
  return routeElements
}
