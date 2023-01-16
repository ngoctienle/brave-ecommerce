import { isUndefined, omitBy } from 'lodash'

import { ProductListConfig } from 'src/types/product.type'

import useQueryParams from './useQueryParams'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '6',
      sort_by: queryParams.sort_by,
      order: queryParams.order,
      exclude: queryParams.exclude,
      name: queryParams.name,
      category: queryParams.category,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter
    },
    isUndefined
  )
  return queryConfig
}
