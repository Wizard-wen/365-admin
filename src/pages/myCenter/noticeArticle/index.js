
//已签约订单处理流程
import signedOrderProcess from './signedOrderProcess.vue'
//
import orderLife from './orderLife.vue'

import accountProcess from './accountProcess.vue'
import businessProcess from './businessProcess.vue'
import programProcess from './programProcess.vue'
import signProcess from './signProcess.vue'
import workerProcess from './workerProcess.vue'


export {
    signedOrderProcess,
    orderLife,
}
//文章对应数组

export const noticeArticleList =[
    {
        id: 6,
        articleName: '365公司总体经营体系',
        tagList:["经营体系", "用例"],
        des: '365公司经营体系',
        created_at: '2020-04-09 14:00:00',
        created_manager: '宋希文',
        componentName: 'businessProcess',
        component: businessProcess
    },
    {
        id: 7,
        articleName: '365后台管理系统账户管理流程',
        tagList:["账户", "用例"],
        des: '365后台管理系统账户管理流程',
        created_at: '2020-04-09 14:00:00',
        created_manager: '宋希文',
        componentName: 'accountProcess',
        component: accountProcess
    },
    {
        id: 2,
        articleName: '365后台管理系统订单来源、分派、处理流程',
        tagList:["订单", "流程", "来源", "分派", "处理"],
        des: '365订单来源、分派、处理流程说明了整个公司业务体系中的订单的来源渠道，帮助大家做好订单的分类。',
        created_at: '2020-04-09 14:00:00',
        created_manager: '宋希文',
        componentName: 'orderLife',
        component: orderLife
    },
    {
        id: 3,
        articleName: '365后台管理系统合同签约、管理流程',
        tagList:["订单", "用例"],
        des: '365的合同分派、签约流程。',
        created_at: '2020-04-09 14:00:00',
        created_manager: '宋希文',
        componentName: 'signProcess',
        component: signProcess
    },
    {
        id: 1,
        articleName: '365后台管理系统已签约订单处理流程',
        tagList:["订单", "用例"],
        des: '365已签约订单处理流程列举了大量的业务用例，帮助大家解决业务场景中的难题。',
        created_at: '2020-04-09 14:00:00',
        created_manager: '宋希文',
        componentName: 'signedOrderProcess',
        component: signedOrderProcess
    },
    {
        id: 4,
        articleName: '365后台管理系统服务人员创建流程',
        tagList:["服务人员", "用例"],
        des: '365后台管理系统服务人员创建流程',
        created_at: '2020-04-09 14:00:00',
        created_manager: '宋希文',
        componentName: 'workerProcess',
        component: workerProcess
    },
    {
        id: 5,
        articleName: '365后台管理系统开发流程',
        tagList:["开发", "用例"],
        des: '365后台管理系统开发流程',
        created_at: '2020-04-09 14:00:00',
        created_manager: '宋希文',
        componentName: 'programProcess',
        component: programProcess
    },

]