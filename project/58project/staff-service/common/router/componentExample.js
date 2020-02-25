

import tag from '@/pages/componentexample/tag.vue'
import form from '@/pages/componentexample/form.vue'
import picture from '@/pages/componentexample/picture.vue'
import copperTest from '@/pages/componentexample/copperTest.vue'



export const componentExampleModule = [
    //账户管理
    {
        path: '/example/tag',
        name: 'tag',
        component: tag,
    },
    //账户管理
    {
        path: '/example/form',
        name: 'from',
        component: form,
    },
    {
        path: '/example/picture',
        name: 'picture',
        component: picture,
    },
    {
        path: '/example/copperTest',
        name: 'copperTest',
        component: copperTest,
    },
]