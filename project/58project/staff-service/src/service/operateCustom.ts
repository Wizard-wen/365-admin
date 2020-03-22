import {adService} from './operateCustom/adPosition'

import {productListService} from './operateCustom/productList'
import {videoService} from './operateCustom/video'
export const operateCustomService = {
    ...adService,
    ...productListService,
    ...videoService,
}