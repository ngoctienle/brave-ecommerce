import { useQuery } from '@tanstack/react-query'

import productApi from 'src/apis/product.api'

import useQueryParams from 'src/hooks/useQueryParams'

import AsideFilter from './AsideFilter'
import Product from './Product/Product'
import SortProductList from './SortProductList'

export default function ProductList() {
  const queryParams = useQueryParams()

  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProductList(queryParams)
    }
  })

  return (
    <div className='py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 gap-4 rounded-10 bg-FAFAFD p-4 md:grid-cols-3'>
              {data &&
                data.data.data.products.map((product) => (
                  <div
                    className='border-sencondary-1A162E b-sd col-span-1 overflow-hidden rounded-20 border bg-white'
                    key={product._id}
                  >
                    <Product product={product} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
