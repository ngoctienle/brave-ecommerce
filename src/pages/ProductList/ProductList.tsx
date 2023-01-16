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
  const queryConfig = useQueryConfig()

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <div className='py-6'>
      <div className='container'>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter categories={categoriesData?.data.data || []} queryConfig={queryConfig} />
            </div>
            <div className='col-span-9'>
              <SortProductList
                queryConfig={queryConfig}
                pageSize={productsData.data.data.pagination.page_size}
              />
              <div className='mt-6 grid grid-cols-2 gap-6 md:grid-cols-3'>
                {productsData.data.data.products.map((product) => (
                  <div
                    className='b-sd col-span-1 overflow-hidden rounded-20 border border-secondary-EDEDF6 bg-white'
                    key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination
                queryConfig={queryConfig}
                pageSize={productsData.data.data.pagination.page_size}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
