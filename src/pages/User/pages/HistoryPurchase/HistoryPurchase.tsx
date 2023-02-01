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
      className={classNames(
        'fs-14 flex flex-1 items-center justify-center whitespace-nowrap rounded-8 border bg-white p-2 text-center transition-colors md:fs-16 md:py-3 md:px-4',
        {
          'border-secondary-77DAE6 font-semibold text-secondary-77DAE6': status === tab.status,
          'border-secondary-EDEDF6 text-primary-1A162E hover:border-secondary-9E9DA8':
            status !== tab.status
        }
      )}>
      {tab.name}
    </Link>
  ))

  return (
    <Fragment>
      <div className='overflow-x-auto scrollbar-thin scrollbar-track-secondary-EDEDF6 scrollbar-thumb-secondary-9E9DA8 scrollbar-track-rounded-8 scrollbar-thumb-rounded-8'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex h-[73px] items-center gap-3 border-b border-t border-t-secondary-EDEDF6 border-b-secondary-EDEDF6 p-3 md:h-[81px] md:gap-4 md:py-4 md:px-6 mmd:border-t-0 mmd:border-l mmd:border-l-secondary-EDEDF6'>
            {purchaseTabsLink}
          </div>
          <div className='overflow-y-auto scrollbar-thin scrollbar-track-secondary-EDEDF6 scrollbar-thumb-secondary-9E9DA8 scrollbar-track-rounded-8 scrollbar-thumb-rounded-8'>
            <div className='max-h-[518px] '>
              <div className='p-3 md:p-4 mmd:border-l'>
                {purchasesInCart?.map((purchase) => (
                  <div
                    key={purchase._id}
                    className='mt-3 rounded-16 border border-secondary-EDEDF6 bg-white p-4 text-gray-800 transition-colors first:mt-0 hover:border-secondary-9E9DA8 hover:shadow-sm md:mt-4 md:p-6'>
                    <Link
                      to={`${paths.home}${generateNameId({
                        name: purchase.product.name,
                        id: purchase.product._id
                      })}`}
                      className='flex'>
                      <div className='flex-shrink-0'>
                        <img
                          className='h-16 w-16 object-cover md:h-20 md:w-20'
                          src={purchase.product.image}
                          alt={purchase.product.name}
                        />
                      </div>
                      <div className='ml-3 flex-grow overflow-hidden'>
                        <h2 className='fs-14 truncate font-semibold text-primary-1A162E mlg:fs-16'>
                          {purchase.product.name}
                        </h2>
                        <span className='fs-14 text-primary-1A162E'>(x{purchase.buy_count})</span>
                      </div>
                      <div className='ml-3 mt-auto flex-shrink-0'>
                        <p className='text-end'>
                          <span className='fs-14 truncate text-primary-F94545/70 line-through'>
                            ₫{formatCurrency(purchase.product.price_before_discount)}
                          </span>
                          <span className='fs-14 ml-2 truncate text-primary-1A162E'>
                            ₫{formatCurrency(purchase.product.price)}
                          </span>
                        </p>
                        <div className='flex items-center justify-end'>
                          <span className='fs-14 text-primary-1A162E lg:fs-16'>Tổng giá tiền:</span>
                          <span className='fs-18 ml-2 font-semibold text-primary-67B044 lg:fs-20'>
                            ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
