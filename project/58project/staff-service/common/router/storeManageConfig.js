/**
 * 门店管理
 */
import storeList from '@/pages/store/storeList/index.vue'
import storeItem from '@/pages/store/storeItem.vue'
import storeEdit from '@/pages/store/storeEdit.vue'
import storeStatistic from '@/pages/store/storeStatistic.vue'

export const storeManageConfigModule = [
    {
        path: '/store/storeList',
        name: 'storeList',
        component: storeList,
    },
    {
        path: '/store/storeItem',
        name: 'storeItem',
        component: storeItem,
    },
    {
        path: '/store/storeEdit',
        name: 'storeEdit',
        component: storeEdit,
    },
    {
        path: '/store/storeStatistic',
        name: 'storeStatistic',
        component: storeStatistic,
    },
]