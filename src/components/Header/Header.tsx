import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import { AppContext } from 'src/contexts/app.context'
import { LogoutAccount } from 'src/apis/auth.api'

import Popover from 'src/components/Popover'
import paths from 'src/constants/paths'
import Brand from '../Brand'

export default function Header() {
  const { setIsAuthenticated, isAuthenticated, setUserProfile, userProfile } = useContext(AppContext)

  const logoutMutation = useMutation({
    mutationFn: LogoutAccount,
    onSuccess: () => {
      setIsAuthenticated(false)
      setUserProfile(null)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <header className='bg-EEEEEE pb-5 pt-2'>
      <div className='container'>
        <div className='flex justify-end'>
          <Popover
            className='flex cursor-pointer items-center'
            renderPopover={
              <div className='flex flex-col rounded-16 bg-white p-3 shadow-lg'>
                <button className='fs-16 rounded-8 py-3 px-6 text-secondary-1A162E transition-colors hover:bg-secondary-F8F8FB/60 hover:text-secondary-77DAE6'>
                  Tiếng Việt
                </button>
                <button className='fs-16 mt-1 rounded-8 py-3 px-6 text-secondary-1A162E transition-colors hover:bg-secondary-F8F8FB/60 hover:text-secondary-77DAE6'>
                  Tiếng Anh
                </button>
              </div>
            }
          >
            <img
              src='src/assets/icon-global-light.svg'
              alt='Support Language'
              title='Support Language'
              width={24}
              height={24}
            />
            <span className='fs-16 mx-1 text-secondary-1A162E transition-colors hover:text-secondary-1A162E/70'>
              Tiếng Việt
            </span>
            <img src='src/assets/icon-arrow-down-light.svg' alt='See More' title='See More' width={20} height={20} />
          </Popover>
          {isAuthenticated && (
            <Popover
              className='ml-6 flex cursor-pointer items-center'
              renderPopover={
                <div className='flex flex-col rounded-16 bg-white p-3 shadow-lg'>
                  <Link
                    className='fs-16 rounded-8 py-3 px-6 text-left text-secondary-1A162E transition-colors hover:bg-secondary-F8F8FB/60 hover:text-secondary-77DAE6'
                    to={paths.profile}
                  >
                    Tài khoản của tôi
                  </Link>
                  <Link
                    className='fs-16 rounded-8 py-3 px-6 text-left text-secondary-1A162E transition-colors hover:bg-secondary-F8F8FB/60 hover:text-secondary-77DAE6'
                    to={paths.home}
                  >
                    Đơn mua
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='fs-16 rounded-8 py-3 px-6 text-left text-secondary-1A162E transition-colors hover:bg-secondary-F8F8FB/60 hover:text-secondary-77DAE6'
                  >
                    Đăng xuất
                  </button>
                </div>
              }
            >
              <div className='mr-2 h-6 w-6 flex-shrink-0'>
                <img src='' alt='' title='' className='h-full w-full rounded-full object-cover' />
              </div>
              <span className='fs-16 text-secondary-1A162E transition-colors hover:text-secondary-1A162E/70'>
                {userProfile?.email}
              </span>
            </Popover>
          )}
          {!isAuthenticated && (
            <div className='flex items-center'>
              <Link
                to={paths.register}
                className='fs-16 mx-3 capitalize text-secondary-1A162E transition-colors hover:text-secondary-1A162E/70'
              >
                Đăng kí
              </Link>
              <div className='h-4 border-r-[1px] border-r-secondary-1A162E'></div>
              <Link
                to={paths.login}
                className='fs-16 mx-3 capitalize text-secondary-1A162E transition-colors hover:text-secondary-1A162E/70'
              >
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
        <div className='mt-2 grid grid-cols-12'>
          <Link to='/' className='col-span-3 flex max-w-max items-center'>
            <Brand />
          </Link>

          <div className='col-span-9 flex items-center justify-end gap-5'>
            <form className='flex h-10 w-[400px] items-center overflow-hidden rounded-8 bg-white px-4'>
              <input
                type='text'
                name='search'
                placeholder='Free ship đơn từ 0 đồng..'
                className='flex-grow border-none bg-transparent text-secondary-1A162E outline-none placeholder:fs-14 placeholder:text-secondary-1A162E/70'
              />
              <button className='flex-shrink-0 rounded-8'>
                <img
                  src='src/assets/icon-search-light.svg'
                  alt='Search Icon'
                  title='Search Icon'
                  width={24}
                  height={24}
                />
              </button>
            </form>
            <Popover
              renderPopover={
                <div className='flex max-w-[400px] flex-col rounded-16 bg-white p-3 shadow-lg'>
                  <div className='flex items-center justify-between'>
                    <span className='fs-16 font-semibold capitalize text-secondary-1A162E'>Sản phẩm mới thêm</span>
                    <span className='fs-12 cursor-pointer capitalize text-primary-0071DC hover:underline'>
                      xem giỏ hàng
                    </span>
                  </div>
                  <div className='mt-2 h-[1px] bg-secondary-EDEDF6'></div>
                  <div className='mt-2 flex items-center gap-2 rounded-8 p-3 hover:bg-secondary-F8F8FB/60'>
                    <img src='src/assets/react.svg' alt='' className='h-10 w-10 object-cover' />
                    <div className='flex-grow overflow-hidden'>
                      <p className='fs-16 truncate text-secondary-1A162E'>
                        Đây là name của sản phẩm vừa được thêm ahihihihihihihiihi
                      </p>
                    </div>
                    <div className='flex-shrink-0'>
                      <span className='text-secondary-77DAE6'>455.000</span>
                    </div>
                  </div>
                  <div className='mt-2 flex items-center gap-2 rounded-8 p-3 hover:bg-secondary-F8F8FB/60'>
                    <img src='src/assets/react.svg' alt='' className='h-10 w-10 object-cover' />
                    <div className='flex-grow overflow-hidden'>
                      <p className='fs-16 truncate text-secondary-1A162E'>
                        Đây là name của sản phẩm vừa được thêm ahihihihihihihiihi
                      </p>
                    </div>
                    <div className='flex-shrink-0'>
                      <span className='text-secondary-77DAE6'>455.000</span>
                    </div>
                  </div>
                  <div className='mt-2 flex items-center gap-2 rounded-8 p-3 hover:bg-secondary-F8F8FB/60'>
                    <img src='src/assets/react.svg' alt='' className='h-10 w-10 object-cover' />
                    <div className='flex-grow overflow-hidden'>
                      <p className='fs-16 truncate text-secondary-1A162E'>
                        Đây là name của sản phẩm vừa được thêm ahihihihihihihiihi
                      </p>
                    </div>
                    <div className='flex-shrink-0'>
                      <span className='text-secondary-77DAE6'>455.000</span>
                    </div>
                  </div>
                </div>
              }
            >
              <Link to='/' className='relative block h-10 w-10 rounded-8 bg-white'>
                <img
                  className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                  src='src/assets/icon-cart-light.svg'
                  alt='Add To Cart'
                  title='Add To Cart'
                  width={24}
                  height={24}
                />
                <span className='fs-9 absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-secondary-77DAE6'>
                  1
                </span>
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  )
}
