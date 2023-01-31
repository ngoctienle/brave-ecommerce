import { Fragment } from 'react'
import { createSearchParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'

import { formatCurrency, generateNameId } from 'src/utils/utils'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { purchaseStatus } from 'src/constants/purchase'
import purchaseApi from 'src/apis/purchase.api'
import paths from 'src/constants/paths'

import useQueryParams from 'src/hooks/useQueryParams'

const purchaseTabs = [
  { status: purchaseStatus.all, name: 'Tất cả' },
  { status: purchaseStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchaseStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: purchaseStatus.inProgress, name: 'Đang giao' },
  { status: purchaseStatus.delivered, name: 'Đã giao' },
  { status: purchaseStatus.cancelled, name: 'Đã hủy' }
]

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchaseStatus.all

  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchaseList({ status: status as PurchaseListStatus })
  })

  const purchasesInCart = purchasesInCartData?.data.data

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: paths.historyPurchase,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center bg-white py-3 text-center', {
        'text-red-500': status === tab.status,
        'text-gray-900': status !== tab.status
      })}>
      {tab.name}
    </Link>
  ))

  return (
    <Fragment>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex h-[81px] items-center border-l border-b border-l-secondary-EDEDF6 border-b-secondary-EDEDF6 p-4'>
            {purchaseTabsLink}
          </div>
          <div className='border-l border-l-secondary-EDEDF6 p-4'>
            {purchasesInCart?.map((purchase) => (
              <div
                key={purchase._id}
                className='mt-4 rounded-16 bg-white p-6 text-gray-800 first:mt-0'>
                <Link
                  to={`${paths.home}${generateNameId({
                    name: purchase.product.name,
                    id: purchase.product._id
                  })}`}
                  className='flex'>
                  <div className='flex-shrink-0'>
                    <img
                      className='h-20 w-20 object-cover'
                      src={purchase.product.image}
                      alt={purchase.product.name}
                    />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncate'>{purchase.product.name}</div>
                    <div className='mt-3'>x{purchase.buy_count}</div>
                  </div>
                  <div className='ml-3 flex-shrink-0'>
                    <span className='truncate text-gray-500 line-through'>
                      ₫{formatCurrency(purchase.product.price_before_discount)}
                    </span>
                    <span className='text-orange ml-2 truncate'>
                      ₫{formatCurrency(purchase.product.price)}
                    </span>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <div>
                    <span>Tổng giá tiền</span>
                    <span className='text-orange ml-4 text-xl'>
                      ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  )
}
