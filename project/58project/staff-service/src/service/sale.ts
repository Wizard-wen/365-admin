

import {
    saleWorkerListService,
    saleSignPageService,
    salePublicOrderListService,
    saleOrderConfigService,
    saleOrderListService,
    saleContractListService,
    saleContractItemService,
    salePublicOrderConfigService,
} from './sale/index'



export const saleService = {
    ...saleWorkerListService,
    ...saleSignPageService,
    ...salePublicOrderListService,
    ...saleOrderConfigService,
    ...saleOrderListService,
    ...saleContractListService,
    ...saleContractItemService,
    ...salePublicOrderConfigService,
}