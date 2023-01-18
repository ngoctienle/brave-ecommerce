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
  }
}

export default purchaseApi
