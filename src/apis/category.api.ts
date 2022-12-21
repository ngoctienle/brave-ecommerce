import http from 'src/utils/http'

import { Category } from 'src/types/category.type'
import { SuccessRespone } from 'src/types/utils.type'

const URL = 'categories'

const categoryApi = {
  getCategories() {
    return http.get<SuccessRespone<Category[]>>(URL)
  }
}

export default categoryApi
