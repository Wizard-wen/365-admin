import {
    apiRequestOrder, apiRequestCommon,
} from '@/request/index.ts'

import {saleApplyOrderForm} from '@/public/module/orderList/IorderList.ts'
export const publicOrderListService = {
    saleApplyOrder(saleApplyOrderForm:saleApplyOrderForm){
        return apiRequestOrder.applyOrder(saleApplyOrderForm)
    }
}