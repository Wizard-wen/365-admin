/**
 * 个人中心
 */

import homePage from '@/pages/myCenter/homePage.vue'
import mySetting from '@/pages/myCenter/mySetting.vue'

export const myCenterConfigModule = [
    {
        path: '/myCenter/homePage',
        name: 'homePage',
        component: homePage,
    },
    {
        path: '/myCenter/mySetting',
        name: 'mySetting',
        component: mySetting,
    },
]