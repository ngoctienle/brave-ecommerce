import { Fragment, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  AdjustmentsHorizontalIcon,
  ClipboardDocumentCheckIcon,
  PencilSquareIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import classNames from 'classnames'

import { AppContext } from 'src/contexts/app.context'
import paths from 'src/constants/paths'
import { getAvatarUrl } from 'src/utils/utils'

export default function UserSideBar() {
  const { userProfile } = useContext(AppContext)

  return (
    <Fragment>
      <div className='flex items-center border-b border-b-secondary-EDEDF6 p-4'>
        <Link
          to={paths.profile}
          className='flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-8 border border-secondary-D2D1D6'>
          {userProfile?.avatar ? (
            <img
              src={getAvatarUrl(userProfile.avatar)}
              alt={userProfile.email}
              title={userProfile.email}
              className='h-full w-full object-cover'
            />
          ) : (
            <UserIcon className='h-6 w-6 object-cover text-primary-1A162E' />
          )}
        </Link>
        <div className='ml-4 flex-grow'>
          <p className='mb-1 truncate font-semibold text-primary-1A162E'>{userProfile?.email}</p>
          <Link to={paths.profile} className='flex items-center capitalize text-secondary-9E9DA8'>
            <span className='fs-14'>Sửa hồ sơ</span>
            <PencilSquareIcon className='ml-2 h-4 w-4' />
          </Link>
        </div>
      </div>
      <div className='p-4'>
        <NavLink
          to={paths.profile}
          className={({ isActive }) =>
            classNames('flex items-center capitalize transition-colors', {
              'font-semibold text-secondary-77DAE6': isActive,
              'text-primary-1A162E': !isActive
            })
          }>
          <div className='mr-3 h-[22px] w-[22px]'>
            <UserIcon stroke='currentColor' />
          </div>
          Tài khoản của tôi
        </NavLink>
        <NavLink
          to={paths.changePassword}
          className={({ isActive }) =>
            classNames('mt-4 flex items-center capitalize transition-colors', {
              'font-semibold text-secondary-77DAE6': isActive,
              'text-primary-1A162E': !isActive
            })
          }>
          <div className='mr-3 h-[22px] w-[22px]'>
            <AdjustmentsHorizontalIcon stroke='currentColor' />
          </div>
          Đổi mật khẩu
        </NavLink>
        <NavLink
          to={paths.historyPurchase}
          className={({ isActive }) =>
            classNames('mt-4 flex items-center  capitalize transition-colors', {
              'font-semibold text-secondary-77DAE6': isActive,
              'text-primary-1A162E': !isActive
            })
          }>
          <div className='mr-3 h-[22px] w-[22px]'>
            <ClipboardDocumentCheckIcon stroke='currentColor' />
          </div>
          Đơn mua
        </NavLink>
      </div>
    </Fragment>
  )
}
