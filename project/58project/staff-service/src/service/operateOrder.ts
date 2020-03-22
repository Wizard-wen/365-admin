


import {
    clientRequireItemService,
    clientRequireListService,
    orderApplyItemService,
    orderApplyListService,
    operateCreateOrderService,
    operateOrderConfigService,
    operateOrderListService,
} from './operateOrder/index'


export const operateOrderService = {
    ...orderApplyListService,
    ...clientRequireListService,
    ...clientRequireItemService,
    ...orderApplyItemService,
    ...operateCreateOrderService,
    ...operateOrderConfigService,
    ...operateOrderListService,
}




