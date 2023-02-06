import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import { useQuery } from '@tanstack/react-query'

import { ProductListConfig } from 'src/types/product.type'
import productApi from 'src/apis/product.api'

import AsideFilter from './components/AsideFilter'
import Product from './components/Product/Product'
import SortProductList from './components/SortProductList'
import Pagination from 'src/components/Pagination'

import categoryApi from 'src/apis/category.api'
import useQueryConfig from 'src/hooks/useQueryConfig'

export default function ProductList() {
  const { t } = useTranslation('product')
  const queryConfig = useQueryConfig()

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <Fragment>
      <Helmet>
        <title>Brave Ecommerce</title>
        <meta name='description' content='Helmet application' />
      </Helmet>
      <div className='py-4 lg:py-6'>
        <div className='container'>
          {productsData && (
            <div className='grid grid-cols-1 gap-5 mmd:grid-cols-12 lg:gap-6'>
              <div className='mmd:col-span-3'>
                <AsideFilter
                  categories={categoriesData?.data.data || []}
                  queryConfig={queryConfig}
                />
              </div>
              <div className='mmd:col-span-9'>
                <SortProductList
                  queryConfig={queryConfig}
                  pageSize={productsData.data.data.pagination.page_size}
                />
                {productsData.data.data.products.length > 0 && (
                  <div className='mt-5 grid grid-cols-1 gap-5 xsm:grid-cols-2 sm:grid-cols-3 lg:mt-6 lg:gap-6'>
                    {productsData.data.data.products.map((product) => (
                      <div
                        className='b-sd col-span-1 overflow-hidden rounded-20 border border-secondary-EDEDF6 bg-white transition-colors hover:border-secondary-9E9DA8 hover:shadow-sm'
                        key={product._id}>
                        <Product product={product} />
                      </div>
                    ))}
                  </div>
                )}
                {productsData.data.data.products.length > 0 ? (
                  <Pagination
                    queryConfig={queryConfig}
                    pageSize={productsData.data.data.pagination.page_size}
                  />
                ) : (
                  <p className='fs-16 mt-5 text-center text-primary-F94545'>
                    {t('product:no-search')}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}
