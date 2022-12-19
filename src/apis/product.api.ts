import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { SuccessRespone } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'products'

const productApi = {
  getProductList(params: ProductListConfig) {
    return http.get<SuccessRespone<ProductList>>(URL, {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<SuccessRespone<Product>>(`${URL}/${id}`)
  }
}

export default productApi
