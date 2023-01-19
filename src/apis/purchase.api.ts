import http from 'src/utils/http'

import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessRespone } from 'src/types/utils.type'

const URL = 'purchases'

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessRespone<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchaseList(params: { status: PurchaseListStatus }) {
    return http.get<SuccessRespone<Purchase[]>>(`${URL}`, {
      params
    })
  },
  purchaseProduct(body: { product_id: string; buy_count: number }[]) {
    return http.post<SuccessRespone<Purchase[]>>(`${URL}/buy-products`, body)
  },
  purchaseUpdate(body: { product_id: string; buy_count: number }) {
    return http.put<SuccessRespone<Purchase>>(`${URL}/update-purchase`, body)
  },
  purchaseDelete(purchaseListId: string[]) {
    return http.delete<SuccessRespone<{ deleted_count: number }>>(`${URL}`, {
      data: purchaseListId
    })
  }
}

export default purchaseApi
